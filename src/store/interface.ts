import { IProfile } from "@/interfaces/IUser";

import { AuthState } from '@/store/modules/auth'

export interface RootState {
    // menuAtivo: boolean;
    // spec: {
    //     profiles: IProfile[]
    // },
    auth: AuthState
}