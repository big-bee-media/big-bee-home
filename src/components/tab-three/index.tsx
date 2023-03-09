import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Image from 'next/image'
import dynamic from 'next/dynamic';

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

const Sport = imageFactory('Sport', 6) ?? []

const Product = imageFactory('Product', 6) ?? []

const Portrait = imageFactory('Portrait', 6) ?? []

const FoodDrink = imageFactory('Food_Drink', 6) ?? []

const Event = imageFactory('Event', 6) ?? []

const albums = [
    { images: Sport, title: 'Sport' },
    { images: Product, title: 'Product' },
    { images: Portrait, title: 'Portrait' },
    { images: FoodDrink, title: 'Food & Drink' },
    { images: Event, title: 'Event' },
]

const PortfolioGrid = ({ column }: { column: string }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [selectedAlbum, setSelectedAlbum] = useState<typeof albums[0]>(albums[0])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const images = selectedAlbum?.images?.map?.(item => ({ src: item.src }))
    console.log('images', images)
    return (
        <div className=''>
            <Tabs>
                <div className="row text-center">
                    <div className="col-lg-12">
                        <div className="section-title text-center pb--30">
                            <h2 className="theme-gradient">Our Portfolio</h2>
                        </div>
                        <div className="tablist-inner">
                            <TabList className="pv-tab-button text-center mt--0">
                                {albums.map(item => <Tab key={item.title}><span>{item.title}</span></Tab>)}
                            </TabList>
                        </div>
                    </div>
                </div>
                {albums.map((album, index) => {
                    return (
                        <TabPanel key={index} className={'album-grid'}>
                            {album.images.map((image, index) => (
                                <div className={'album-item-wrapper'} key={index}>
                                    <div className="item">
                                        <Image
                                            onClick={() => {
                                                setSelectedAlbum(album)
                                                setSelectedIndex(index)
                                                setIsOpen(true)
                                            }}
                                            fill
                                            quality={10}
                                            src={image.src}
                                            alt={image.category}
                                            sizes="(max-width: 768px) 100vw,
                                                    (max-width: 1200px) 50vw,
                                                    33vw"
                                        />
                                    </div>
                                </div>
                            ))}
                        </TabPanel>
                    )
                })}
                <Viewer
                    activeIndex={selectedIndex}
                    visible={isOpen}
                    onClose={() => { setIsOpen(false); }}
                    images={selectedAlbum?.images?.map?.(item => ({ src: item.src }))}
                />
            </Tabs>
        </div>
    )
}


export default PortfolioGrid
