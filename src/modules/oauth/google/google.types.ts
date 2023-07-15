export type GoogleProfile = {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: { value: string; verfiied: boolean }[];
  photos: { value: string }[];
  provider: "google";
};

export type GoogleUser = {
  provider: "google";
  providerId: string;
  email: string;
  name: string;
  picture: string;
};
