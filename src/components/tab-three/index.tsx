import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { animated, easings, useInView, useSpring, useSpringRef, useTransition } from '@react-spring/web';

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
        src: `portfolio/${album}/img-${index + 1}.jpg`,
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

const AlbumGrid = ({ images }: { images: Image[] }) => {
    const [ref, inView] = useInView()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const animatedImageRef = useSpringRef()
    const animatedImage = useTransition(images.slice(0, 6), {
        ref: animatedImageRef,
        from: { opacity: 0, y: 100, scale: 0 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 0, y: 100, scale: 0 },
        config: {
            mass: 5, tension: 500, friction: 100,
        },
        trail: 60,
    })

    useEffect(() => {
        if (inView) {
            animatedImageRef.start({ opacity: 1, y: 0, scale: 1 })
        } else {
            animatedImageRef.start({ opacity: 0, y: 100, scale: 0 })
        }
    }, [animatedImageRef, inView])

    return <>
        {animatedImage((style, image, state, index) => (
            <div className={'album-item-wrapper'} key={index} ref={ref}>
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
                        sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                    />
                </animated.div>
            </div>
        ))}
        <Viewer
            downloadable={false}
            activeIndex={selectedIndex}
            visible={isOpen}
            noNavbar
            onClose={() => { setIsOpen(false); }}
            images={images}
            defaultScale={1.2}
        />
    </>
}

const PortfolioGrid = () => {
    const [ref, inView] = useInView()

    const textStyleRef = useSpringRef()
    const textStyle = useSpring({
        ref: textStyleRef,
        from: { y: 1000 },
        to: { y: 0 },
        delay: 100,
    })
    const tabStyleRef = useSpringRef()
    const tabStyle = useSpring({
        ref: tabStyleRef,
        from: { opacity: 1, y: 1000 },
        to: { opacity: 1, y: 0 },
    })

    const animatedTitleRef = useSpringRef()
    const animatedTitle = useTransition(albums, {
        ref: animatedTitleRef,
        from: { opacity: 0, y: -100, scale: 0 },
        enter: { opacity: 1, y: 0, scale: 1 },
        leave: { opacity: 1, y: 0, scale: 1 },
        config: { mass: 5, tension: 500, friction: 100 },
        trail: 50,
    })

    useEffect(() => {
        if (inView) {
            console.log('inView', inView)
            textStyleRef.start({ y: 0 })
            tabStyleRef.start({ opacity: 1, y: 0 })
            animatedTitleRef.start({ opacity: 1, y: 0, scale: 1 })
        } else {
            textStyleRef.start({ y: 1000 })
            tabStyleRef.start({ opacity: 0, y: 1000 })
            animatedTitleRef.start({ opacity: 0, y: -100, scale: 0 })
        }
    }, [inView])

    return (
        <Tabs>
            <div className="row text-center">
                <div className="col-lg-12">
                    <div className="section-title text-center pb--30" ref={ref}>
                        <animated.h2 style={textStyle} className="theme-gradient">Our Portfolio</animated.h2>
                    </div>
                    <animated.div className="tablist-inner" style={tabStyle}>
                        <TabList className="pv-tab-button text-center mt--0">
                            {animatedTitle((style, item) => (
                                <Tab key={item.title}><animated.span style={style}>{item.title}</animated.span></Tab>
                            ))}
                        </TabList>
                    </animated.div>
                </div>
            </div>
            {albums.map((album, index) => {
                return (
                    <TabPanel key={index} className={'album-grid'}>
                        <AlbumGrid images={album.images} />
                    </TabPanel>
                )
            })}
        </Tabs>
    )
}


export default PortfolioGrid
