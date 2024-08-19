import process from 'process';

export default (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    return res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }
  if (process.env.NODE_ENV === 'PRODUCTION') {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  return next();
};
