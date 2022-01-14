export interface IUser {
    name:string;
    last_name:string;
    email: string;
    password?: string;
    user_profile_id: number;
    company_id?: number;
    supervisor_id?:number;
}

export interface IUserData extends IUser {
    status: string;
    created_at:string;
    user_profile_desc:string;
}


export interface IProfile {
    id?:number;
    description:string;
}