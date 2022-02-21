import { IMidiaTypes } from "@/interfaces/IMidia";
import { IProductImage } from "@/interfaces/IProduct";
import { Ref, ref } from "vue";
type MidiaItem = {
  id: number;
  type: IMidiaTypes
}

interface IComposition {
  images: Ref<IProductImage[]>,
  removeImage: (imagem: IProductImage) => void
}

export default function useImage(midiasRemoved: Ref<MidiaItem[]>): IComposition {
  const images = ref<IProductImage[]>([])

  const removeImage = (imagem: IProductImage) => {
    const imageIndex = images.value.findIndex(item => item.url == imagem.url);

    if(imageIndex !== -1) {
      images.value.splice(imageIndex, 1);
      if(imagem.id) {
        const { id, type } = imagem;
        midiasRemoved.value.push({
          id,
          type
        });
      }
    }
  }


  return {
    images,
    removeImage
  }
}