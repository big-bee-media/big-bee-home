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

const albums = [
    { images: Sport, title: 'Sport' },
    { images: Product, title: 'Product' },
    { images: Portrait, title: 'Portrait' },
    { images: FoodDrink, title: 'Food & Drink' },
    { images: Event, title: 'Event' },
    { images: Wedding, title: 'Wedding' },
]

const AlbumGrid = ({ images, name }: { images: Image[], name: string }) => {
    const [refText, inViewText] = useInView()
    const [refOfLastImage, inViewOfLastImage] = useInView()
    const [showMore, setShowMore] = useState(false)

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

    useEffect(() => {
        if (inViewBelowText) {
            animatedImageApi.start({ opacity: 1, y: 0, scale: 1 })
        }
        if (inViewText) {
            textStyleApi.start()

        }
        if (refOfLastImage) {
            showMoreAnimatedStyleApi.start()
        }
    }, [animatedImageApi, textStyleApi, inViewText, inViewBelowText, showMoreAnimatedStyleApi, refOfLastImage])

    const renderImage = (generator: TransitionFn<Image, {
        opacity: number;
        y: number;
        scale: number;
    }>, startIndex = 0) => {
        return generator((style, image, state, index) => (
            <div className={'album-item-wrapper'} key={index}>
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
        ))
    }

    return <div className='pt--80'>
        <animated.div ref={refText} style={textStyle} className="section-title text-center pb--30">
            <h2 ref={refBelowText} className="theme-gradient">{name}</h2>
        </animated.div>
        <div className='album-grid'>
            {renderImage(animatedImage)}
            {showMore && renderImage(animatedRestImage, 6)}
        </div>
        {!showMore && <animated.div style={showMoreAnimatedStyle} className='show-more' onClick={() => setShowMore(prev => !prev)}>
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
                    <AlbumGrid key={index} images={album.images} name={album.title} />)
            }
        </div>
    )
}


export default PortfolioGrid
