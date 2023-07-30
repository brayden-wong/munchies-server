export type Done = (err: Error, user: any) => void;

export type Profile = {
  id: string;
  username: string;
  global_name: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  banner_color: string;
  accent_color: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  avatar_decoration: any;
  email: string;
  verified: true;
  provider: "discord";
  accessToken: string;
  fetchedAt: Date;
};

export type DiscordProfile = {
  providerId: string;
  provider: "discord";
  username: string;
  avatar: string;
  email: string;
  auth: {
    accessToken: string;
    expiration: number;
    refreshToken: string;
  };
};
