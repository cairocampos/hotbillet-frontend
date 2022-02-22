import { IMidiaTypes } from "@/interfaces/IMidia";
import { Ref, ref } from "vue";

interface IMidia {
  file_name?: string;
  type: IMidiaTypes,
  url?:string;
  description?:string;
}

interface IComposition {
  midias: Ref<IMidia[]>,
  files: Ref<File[]>
}

export default function useMidias(): IComposition {
  const midias = ref<IMidia[]>([]);
  const files = ref<File[]>([]);


  return {
    midias,
    files
  }
}