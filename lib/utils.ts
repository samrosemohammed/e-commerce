import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPassword = async (
  password: string,
  saltRounds: number
): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const validatePassword = async (
  inputPassword: string,
  storedHash: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(inputPassword, storedHash);
  return isMatch;
};

export const capitalizeWords = (str: string): string => {
  return str
    .split(/\s+/) // handles multiple spaces or tabs
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
