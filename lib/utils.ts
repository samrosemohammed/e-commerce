import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react";

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

export const capitalizeWords = (str: string) =>
  str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
