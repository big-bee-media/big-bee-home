import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { animated, TransitionFn, useInView, useSpring, useSpringRef, useTransition } from '@react-spring/web';
import { BsChevronDoubleDown } from "@react-icons/all-files/bs/BsChevronDoubleDown";

type Image = {
    id: string;
    src: string;
    category: string;
}

const Viewer = dynamic(
    () => import('react-viewer'),
    { ssr: false }
)

const imageFactory = (album: string, length: number) => {
    return new Array(length).fill(1).map((item, index) => ({
        id: `img_${index}`,
        src: `/portfolio/${album}/img-${index + 1}.jpg`,
        category: album
    }))
}

const Sport = imageFactory('Sport', 18) ?? []
const Product = imageFactory('Product', 51) ?? []
const Portrait = imageFactory('Portrait', 12) ?? []
const FoodDrink = imageFactory('Food_Drink', 36) ?? []
const Event = imageFactory('Event', 17) ?? []
const Wedding = imageFactory('Wedding', 27) ?? []

type AlbumType = {
    title: string,
    images?: Image[],
    link?: string
    seeMoreLink?: string
}

const getImageUrl = (src: string) => {
    return `https://api.bigbee.media/api/v1${src}?page=0&limit=6`
}

const albums: AlbumType[] = [
    { images: Sport, title: 'Sport' },
    { title: 'Recent images', link: 'https://api.bigbee.media/api/v1/photo', seeMoreLink: 'https://raceapp.bigbee.media/' },
    { images: Product, title: 'Product' },
    { images: Portrait, title: 'Portrait' },
    { images: FoodDrink, title: 'Food & Drink' },
    { images: Event, title: 'Event' },
    { images: Wedding, title: 'Wedding' },
]

const AlbumGrid = ({ images: defaultImages, name, link, seeMoreLink }: { images?: Image[], name: string, link?: string, seeMoreLink?: string }) => {
    const [refText, inViewText] = useInView()
    const [refOfLastImage, inViewOfLastImage] = useInView()
    const [showMore, setShowMore] = useState(false)
    const [images, setImages] = useState(defaultImages ?? [])

    const [refBelowText, inViewBelowText] = useInView({
        rootMargin: '-100px',
    })

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const textStyleApi = useSpringRef()
    const textStyle = useSpring({
        ref: textStyleApi,
        from: { x: 200 },
        to: { x: 0 },
    })

    const [showMoreAnimatedStyle, showMoreAnimatedStyleApi] = useSpring(() => ({
        from: { opacity: 0 },
        to: { opacity: 1 },
    }), [])

    const [animatedImage, animatedImageApi] = useTransition(images.slice(0, 6), () => ({
        from: { opacity: 0, y: 100, scale: 0 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 100, scale: 0 },
        config: {
            mass: 5, tension: 500, friction: 100,
        },
        trail: 120,
        deps: [images]
    }))

    const [animatedRestImage, animatedRestImageApi] = useTransition(images.slice(6), () => ({
        from: { opacity: 0, y: 100, scale: 0 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 100, scale: 0 },
        config: {
            mass: 5, tension: 500, friction: 100,
        },
        trail: 120,
    }))

    useEffect(() => {
        if (showMore) {
            animatedRestImageApi.start({ opacity: 1, y: 0, scale: 1 })
        }
    }, [showMore])

    const getImages = async (link: string) => {
        const resp = await fetch(link)
        const data = await resp.json()
        const images = data.data.map((item: any) => ({
            id: item.id,
            src: getImageUrl(item.preview.url),
            category: 'portfolio'
        }))
        setImages(images);
    }

    useEffect(() => {
        if (link) {
            getImages(link)
        }
    }, [link])

    useEffect(() => {
        if (inViewBelowText) {
            animatedImageApi.start({ opacity: 1, y: 0, scale: 1 })
        }

        if (inViewText) {
            textStyleApi.start()
        }

        if (inViewOfLastImage) {
            showMoreAnimatedStyleApi.start()
        }
    }, [animatedImageApi, textStyleApi, inViewText, inViewBelowText, showMoreAnimatedStyleApi, inViewOfLastImage])

    const renderImage = (generator: TransitionFn<Image, {
        opacity: number;
        y: number;
        scale: number;
    }>, startIndex = 0) => {
        return generator((style, image, state, index) => {
            console.log('Index', index)
            return (
                <div className={'album-item-wrapper'} key={image.id}>
                    <animated.div className="item" style={style} ref={index === 5 ? refOfLastImage : null}>
                        <Image
                            onClick={() => {
                                setSelectedIndex(index + startIndex)
                                setIsOpen(true)
                            }}
                            fill
                            quality={100}
                            src={image.src}
                            alt={image.category}
                            sizes="50vw"
                        />
                    </animated.div>
                </div>
            )
        })
    }

    console.log('Render album', name, animatedImage)
    return <div className='pt--120' id={`portfolio-${name}`}>
        <animated.div ref={refText} style={textStyle} className="section-title text-center pb--30">
            <h2 ref={refBelowText} className="theme-gradient">{name}</h2>
        </animated.div>
        <div className='album-grid'>
            {renderImage(animatedImage)}
            {showMore && renderImage(animatedRestImage, 6)}
        </div>
        {!showMore && <animated.div style={showMoreAnimatedStyle} className='show-more' onClick={() => {
            if (seeMoreLink) {
                window.open(
                    seeMoreLink,
                    '_blank' // <- This is what makes it open in a new window.
                );
            } else {
                setShowMore(prev => !prev)
            }
        }}>
            <span>See more</span> <BsChevronDoubleDown />
        </animated.div>}
        <Viewer
            downloadable={false}
            activeIndex={selectedIndex}
            visible={isOpen}
            noNavbar
            onClose={() => { setIsOpen(false); }}
            images={images}
            onMaskClick={() => { setIsOpen(false); }}
            defaultScale={1.2}
        />
    </div >
}

const PortfolioGrid = () => {
    return (
        <div className='portfolio-wrapper'>
            {
                albums.map((album, index) =>
                    <AlbumGrid
                        key={index}
                        images={album.images}
                        name={album.title}
                        link={album.link}
                        seeMoreLink={album.seeMoreLink}
                    />)
            }
        </div>
    )
}


export default PortfolioGrid
