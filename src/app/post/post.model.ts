export interface Author {
  name: string;
  avatar: string;
}

export class Post {
  id!: number;
  timePosted!: number;
  content: string = '';
  author: Author = { name: 'Diogo Carvalho', avatar: 'DF' };
}
