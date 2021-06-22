declare module '*.png';
declare module '*.jpeg';

declare interface IPost {
  id: number;
  user_id: number;
  category_id: number;
  post_date: string;
  image_url: string;
  description: string;
  name: string;
  username: string;
  email: string;
  likes: ILike[];
}

declare interface ILike {
  id: number;
  user_id: number;
  post_id: number;
}

declare interface ICategory {
  id: number;
  category: string;
  image_url: string;
}

declare interface IUser {
  id: number;
  email: string;
  name: string;
  username: string;
}
