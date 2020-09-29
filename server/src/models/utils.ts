import { genSaltSync, hashSync } from "bcrypt";
import { SALT_ROUNDS } from "../constants";

export const createSalt = (): string => genSaltSync(SALT_ROUNDS);
export const createHash = (str: string, salt: string): string => hashSync(str, salt);
