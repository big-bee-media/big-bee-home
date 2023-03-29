import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { animated, useInView, useSpring, useSpringRef, useTransition } from '@react-spring/web';

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

const Sport = imageFactory('Sport', 13) ?? []
const Product = imageFactory('Product', 51) ?? []
const Portrait = imageFactory('Portrait', 38) ?? []
const FoodDrink = imageFactory('Food_Drink', 47) ?? []
const Event = imageFactory('Event', 23) ?? []

const albums = [
    { images: Sport, title: 'Sport' },
    { images: Product, title: 'Product' },
    { images: Portrait, title: 'Portrait' },
    { images: FoodDrink, title: 'Food & Drink' },
    { images: Event, title: 'Event' },
]

const AlbumGrid = ({ images, name }: { images: Image[], name: string }) => {
    const [refText, inViewText] = useInView()

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

    const [animatedImage, animatedImageApi] = useTransition(images.slice(0, 6), () => ({
        from: { opacity: 0, y: 100, scale: 0 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 100, scale: 0 },
        config: {
            mass: 5, tension: 500, friction: 100,
        },
        trail: 120,
    }))

    useEffect(() => {
        if (inViewBelowText) {
            animatedImageApi.start({ opacity: 1, y: 0, scale: 1 })
        }
        if (inViewText) {
            textStyleApi.start()
        }
    }, [animatedImageApi, textStyleApi, inViewText, inViewBelowText])

    return <div className='pt--80'>
        <animated.div ref={refText} style={textStyle} className="section-title text-center pb--30">
            <h2 ref={refBelowText} className="theme-gradient">{name}</h2>
        </animated.div>
        <div className='album-grid'>
            {animatedImage((style, image, state, index) => (
                <div className={'album-item-wrapper'} key={index}>
                    <animated.div className="item" style={style}>
                        <Image
                            onClick={() => {
                                setSelectedIndex(index)
                                setIsOpen(true)
                            }}
                            fill
                            quality={100}
                            src={image.src}
                            alt={image.category}
                            sizes="
                            // (min-width: 1200px) 50vw,
                            // (min-width: 1024px) 80vw,
                            // (min-width: 768px) 100vw,
                            50vw
                            "
                        />
                    </animated.div>
                </div>
            ))}
        </div>
        <Viewer
            downloadable={false}
            activeIndex={selectedIndex}
            visible={isOpen}
            noNavbar
            onClose={() => { setIsOpen(false); }}
            images={images}
            defaultScale={1.2}
        />
    </div >
}

const PortfolioGrid = () => {
    return (
        <>
            {
                albums.map((album, index) => {
                    return (
                        <AlbumGrid key={index} images={album.images} name={album.title} />
                    )
                })
            }
        </>
    )
}


export default PortfolioGrid
