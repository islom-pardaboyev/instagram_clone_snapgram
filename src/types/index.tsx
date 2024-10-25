export interface UserInfos {
  id:number,
  span_name: string,
  name: string,
  type:string
}

export interface CreateNewUser {
  full_name: string,
  username: string,
  email: string,
  password: string,
}

export interface LoginUser {
  username: string,
  password: string
}

export interface User {
  _id: string
  email: string
  username:string
  fullName:string
  photo:string
}

export interface UserProfile {
  _id: string;
  username: string;
  fullName: string;
  bio: string;
  photo: string;
  followers: Array<{ _id: string }>;
  following: Array<{ _id: string }>;
}

export interface Post {
  _id: string;
  caption: string;
  content: Array<{ url: string; type: string }>;
  content_alt: string;
}