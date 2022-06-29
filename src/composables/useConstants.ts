import * as constants from '@/constants';

type Composition = typeof constants;

export default function useConstants(): Composition {
    return {
        ...constants
    }
}