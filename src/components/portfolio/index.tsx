import React, { useCallback, useEffect, useMemo, useState } from "react";
import { default as NextImage } from "next/image";
import dynamic from "next/dynamic";
import {
  animated,
  type TransitionFn,
  useInView,
  useSpring,
  useSpringRef,
  useTransition,
} from "@react-spring/web";
import { BsChevronDoubleDown } from "@react-icons/all-files/bs/BsChevronDoubleDown";
import type { AlbumType, Image } from "@/type";

const Viewer = dynamic(() => import("react-viewer"), { ssr: false });

const getImageUrl = (src: string) => {
  return `https://api.bigbee.ltd/api/v1${src}?page=0&limit=6`;
};

const AlbumGrid = ({
  images: defaultImages,
  name,
  link,
  seeMoreLink,
}: {
  images?: Image[];
  name: string;
  link?: string;
  seeMoreLink?: string;
}) => {
  const [refText, inViewText] = useInView();
  const [refOfLastImage, inViewOfLastImage] = useInView();
  const [showMore, setShowMore] = useState(false);
  const [images, setImages] = useState(defaultImages ?? []);

  const [refBelowText, inViewBelowText] = useInView({
    rootMargin: "-100px",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const textStyleApi = useSpringRef();
  const textStyle = useSpring({
    ref: textStyleApi,
    from: { x: 200 },
    to: { x: 0 },
  });

  const [showMoreAnimatedStyle, showMoreAnimatedStyleApi] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    []
  );

  const _images = useMemo(() => images.slice(0, 6), [images]);

  const [animatedImage, animatedImageApi] = useTransition(_images, () => ({
    from: { opacity: 0, y: 100, scale: 0 },
    enter: { opacity: 1, y: 0, scale: 1 },
    leave: { opacity: 0, y: 100, scale: 0 },
    config: {
      mass: 5,
      tension: 500,
      friction: 100,
    },
    trail: 120,
    deps: [_images],
  }));

  const [animatedRestImage, animatedRestImageApi] = useTransition(
    images.slice(6),
    () => ({
      from: { opacity: 0, y: 100, scale: 0 },
      enter: { opacity: 1, y: 0, scale: 1 },
      leave: { opacity: 0, y: 100, scale: 0 },
      config: {
        mass: 5,
        tension: 500,
        friction: 100,
      },
      trail: 120,
    })
  );

  useEffect(() => {
    if (showMore) {
      animatedRestImageApi.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [showMore]);

  const getImages = useCallback(async (link: string) => {
    const resp = await fetch(link);
    const data = await resp.json();
    const images = data.data.map((item: any) => ({
      id: item.id,
      src: getImageUrl(item.preview.url),
      category: "portfolio",
    }));
    setImages([...images.slice(0, 6)]);
  }, []);

  useEffect(() => {
    if (link) {
      getImages(link);
    }
  }, [getImages, link]);

  useEffect(() => {
    if (inViewBelowText) {
      animatedImageApi.start({ opacity: 1, y: 0, scale: 1 });
    }

    if (inViewText) {
      textStyleApi.start();
    }

    if (inViewOfLastImage) {
      showMoreAnimatedStyleApi.start();
    }
  }, [
    animatedImageApi,
    textStyleApi,
    inViewText,
    inViewBelowText,
    showMoreAnimatedStyleApi,
    inViewOfLastImage,
  ]);

  const renderImage = (
    generator: TransitionFn<
      Image,
      {
        opacity: number;
        y: number;
        scale: number;
      }
    >,
    startIndex = 0
  ) => {
    return generator((style, image, state, index) => {
      return (
        <div className={"album-item-wrapper"} key={image.id}>
          <animated.div
            className="item"
            style={style}
            ref={index === 5 ? refOfLastImage : null}
          >
            <NextImage
              onClick={() => {
                setSelectedIndex(index + startIndex);
                setIsOpen(true);
              }}
              fill
              quality={100}
              src={image.src}
              alt={image.category}
              sizes="50vw"
            />
          </animated.div>
        </div>
      );
    });
  };

  return (
    <div className="pt--120" id={`portfolio-${name}`}>
      <animated.div
        ref={refText}
        style={textStyle}
        className="section-title text-center pb--30"
      >
        <h2 ref={refBelowText} className="theme-gradient">
          {name}
        </h2>
      </animated.div>
      <div className="album-grid">
        {renderImage(animatedImage)}
        {showMore && renderImage(animatedRestImage, 6)}
      </div>
      {!showMore && (
        <animated.div
          style={showMoreAnimatedStyle}
          className="show-more"
          onClick={() => {
            if (seeMoreLink) {
              window.open(
                seeMoreLink,
                "_blank" // <- This is what makes it open in a new window.
              );
            } else {
              setShowMore((prev) => !prev);
            }
          }}
        >
          <span>See more</span> <BsChevronDoubleDown />
        </animated.div>
      )}
      <Viewer
        downloadable={false}
        activeIndex={selectedIndex}
        visible={isOpen}
        noNavbar
        onClose={() => {
          setIsOpen(false);
        }}
        images={images}
        onMaskClick={() => {
          setIsOpen(false);
        }}
        defaultScale={1.2}
      />
    </div>
  );
};

const PortfolioGrid = ({ albums }: { albums: AlbumType[] }) => {
  return (
    <div className="portfolio-wrapper">
      {albums.map((album, index) => (
        <AlbumGrid
          key={index}
          images={album.images}
          name={album.title}
          link={album.link}
          seeMoreLink={album.seeMoreLink}
        />
      ))}
    </div>
  );
};

export default PortfolioGrid;
