import { ProductMedia } from "@/core/interfaces/Product";
import { Ref, ref } from "vue";
type MidiaItem = {
  id: number;
  type: 'IMAGE' | 'VIDEO'
}

interface IComposition {
  images: Ref<ProductMedia[]>,
  removeImage: (imagem: ProductMedia) => void
}

export default function useImage(midiasRemoved: Ref<MidiaItem[]>): IComposition {
  const images = ref<ProductMedia[]>([])

  const removeImage = (imagem: ProductMedia) => {
    const imageIndex = images.value.findIndex(item => item.url == imagem.url);

    if(imageIndex !== -1) {
      images.value.splice(imageIndex, 1);
      if(imagem.id) {
        const { id, type } = imagem;
        midiasRemoved.value.push({
          id,
          type: `IMAGE`
        });
      }
    }
  }


  return {
    images,
    removeImage
  }
}