import process from 'process';
import ErrorHandler from '../utils/errorHandler.js';

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || 'Internal Server Error',
  };

  // Handle invalid mongoose ID
  if (err?.name === 'CastError') {
    const message = `Resource not found. Invalid ${err?.path}`;
    error = new ErrorHandler(message, 404);
  }

  // Handle validation errors
  if (err?.name === 'ValidationError') {
    const message = Object.values(err?.errors).map((errObj) => errObj?.message);
    error = new ErrorHandler(message, 400);

    // Alternative code
    /*
      const message = Object.keys(err?.errors).map(
        (key) => err?.errors[key]?.message,
      );
      */
  }

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    // Handle the errors in the development environment
    return res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }
  // Handle the errors in the production environment
  if (process.env.NODE_ENV === 'PRODUCTION') {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
  return next();
};
