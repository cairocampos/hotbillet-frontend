import { Profile } from "@/enums/contants"

interface Composition {
    Profile: typeof Profile
}

export default function useContants(): Composition {
    return {
        Profile
    }
}