const ErrorMiddleware = async (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong. Please try again later!",
    statusCode: err.statusCode || 500,
  };

  res.status(customError.statusCode).json({
    status: false,
    message: customError.message,
  });
};

// module.exports = ErrorMiddleware;
export default ErrorMiddleware;
