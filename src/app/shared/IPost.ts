export interface IPost {
    "userId": number;
    "id": number;
    "title": string;
    "body": string;
}

export type AuthorsNames = {
  id: number;
  name: string;
};

export interface IPostData {
  "userId": number;
  "title": string;
  "text": string;
}