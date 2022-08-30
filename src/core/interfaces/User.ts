export interface UserData {
  supervisor_id:number|null;
  profile_id:number;
  name:string;
  email:string;
  profile_picture?:string;
}

export interface User extends UserData {
  id:number;
  status: 1 | 2;
  status_description: string;
  profile_description:string;
}