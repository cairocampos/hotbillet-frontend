import { ProductMedia } from "@/core/interfaces/Product";
import { Ref, ref } from "vue";
type MidiaItem = {
  id: number;
  type: 'IMAGE' | 'VIDEO'
}

interface IComposition {
  videos: Ref<ProductMedia[]>,
  removeVideo: (video: ProductMedia) => void
}

export default function useVideo(midiasRemoved: Ref<MidiaItem[]>): IComposition {
  const videos = ref<ProductMedia[]>([])

  const removeVideo = (video: ProductMedia) => {
    const videoIndex = videos.value.findIndex(item => item.url == video.url);

    if(videoIndex !== -1) {
      videos.value.splice(videoIndex, 1);
      if(video.id) {
        const { id } = video;
        midiasRemoved.value.push({
          id,
          type: "VIDEO"
        });
      }
    }
  }


  return {
    videos,
    removeVideo
  }
}