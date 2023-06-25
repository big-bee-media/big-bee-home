export const imageFactory = (album: string, length: number) => {
  return new Array(length).fill(1).map((item, index) => ({
    id: `img_${index}`,
    src: `/portfolio/${album}/img-${index + 1}.jpg`,
    category: album
  }))
}