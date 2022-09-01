import defaultImage from '@/assets/images/default.png'
export default function useFallbackImage(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = defaultImage
}