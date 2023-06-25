import { AlbumType } from './type'
import { imageFactory } from './utils'

export const SportImages = imageFactory('Sport', 18) ?? []
export const ProductImages = imageFactory('Product', 51) ?? []
export const PortraitImages = imageFactory('Portrait', 12) ?? []
export const FoodDrinkImages = imageFactory('Food_Drink', 36) ?? []
export const EventImages = imageFactory('Event', 17) ?? []
export const WeddingImages = imageFactory('Wedding', 27) ?? []


export const firstAlbums: AlbumType[] = [
  { images: SportImages, title: 'Sport' },
  { title: 'Recent images', link: 'https://api.bigbee.media/api/v1/photo', seeMoreLink: 'https://raceapp.bigbee.media/' },
]

export const secondAlbums: AlbumType[] = [
  { images: ProductImages, title: 'Product' },
  { images: PortraitImages, title: 'Portrait' },
  { images: FoodDrinkImages, title: 'Food & Drink' },
  { images: EventImages, title: 'Event' },
  { images: WeddingImages, title: 'Wedding' },
]