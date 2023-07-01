export type Done = (err: Error, user: any) => void;

export type DiscordProfile = {
  providerId: string;
  provider: "discord";
  username: string;
  email: string;
};
