import { Inject } from "@nestjs/common";

const DRIZZLE_CONFIG_TOKEN = "DRIZZLE_CONFIG_TOKEN";
const DRIZZLE_INJECTION_TOKEN = "DRIZZLE_INJECTION_TOKEN";

export const getDrizzleConfigToken = () => DRIZZLE_CONFIG_TOKEN;
export const getDrizzleInstanceToken = () => DRIZZLE_INJECTION_TOKEN;
export const InjectDrizzle = () => Inject(DRIZZLE_INJECTION_TOKEN);
