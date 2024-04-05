import bcrypt from "bcryptjs";

export const hashPass = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return password;
};
