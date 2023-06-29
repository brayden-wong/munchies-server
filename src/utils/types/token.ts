export type Token = {
  id: string;
  iat: number;
  exp: number;
};

export type RefreshToken = {
  rt: string;
  id: string;
  iat: number;
  exp: number;
};
