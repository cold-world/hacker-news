export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: 'story';
  url: string;
}

export type NewStoriesData = number[];

export interface Comment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: 'comment';
}

export interface ChildComment extends Omit<Comment, 'kids'> {}
