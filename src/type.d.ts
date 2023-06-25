export type Image = {
  id: string;
  src: string;
  category: string;
}

export type AlbumType = {
  title: string,
  images?: Image[],
  link?: string
  seeMoreLink?: string
}