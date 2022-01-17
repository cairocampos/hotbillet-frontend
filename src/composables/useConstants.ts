import * as constants from '@/contants';

type Composition = typeof constants;

export default function useConstants(): Composition {
    return {
        ...constants
    }
}