export interface IUser {
    id?:number;
    name:string;
    email: string;
    profile_id: number;
    supervisor_id?:number;
    profile_picture?:string;
}

export interface IUserData extends IUser {
    status: string;
    created_at:string;
    user_profile_desc:string;
}


export interface IProfile {
    id:number;
    description:string;
}