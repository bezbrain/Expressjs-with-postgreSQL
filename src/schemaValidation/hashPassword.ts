import bcrypt from "bcryptjs";

export const hashPass = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  return password;
};

export const comparePassword = async (
  inputPassword: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatch;
};
