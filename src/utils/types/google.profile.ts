export type GoogleProfile = {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  emails: { value: string; verfiied: boolean }[];
  photos: { value: string }[];
  provider: "google";
};
