export type GetExploreParams = {
  username?: string;
  recipe?: string;
  name?: string;
};

type Recipe = {
  id: string;
  name: string;
  description: string;
  authorId: string;
};

type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
};

export type Explore = {
  users: Array<User>;
  recipes: Array<Recipe>;
};
