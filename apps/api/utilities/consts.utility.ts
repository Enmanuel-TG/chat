export const PORT = process.env.PORT || 3000;
export const TOKEN_SECRET: string = process.env.TOKEN_SECRET || "some secret key";
export const TOKEN_EXPIRES: number = parseInt(
  process.env.TOKEN_EXPIRES || "604800",
  10
);// ----> second = 7days

export const NAME_TOKEN = "token";