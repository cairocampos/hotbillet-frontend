import { IMidiaTypes } from "@/interfaces/IMidia";
import { IProductVideo } from "@/interfaces/IProduct";
import { Ref, ref } from "vue";
type MidiaItem = {
  id: number;
  type: IMidiaTypes
}

interface IComposition {
  videos: Ref<IProductVideo[]>,
  removeVideo: (video: IProductVideo) => void
}

export default function useVideo(midiasRemoved: Ref<MidiaItem[]>): IComposition {
  const videos = ref<IProductVideo[]>([])

  const removeVideo = (video: IProductVideo) => {
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