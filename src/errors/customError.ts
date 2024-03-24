class CustomError extends Error {
  constructor(message: string | undefined) {
    super(message);
  }
}

export default CustomError;
