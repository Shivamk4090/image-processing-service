function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error for debugging
  console.error(err);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
}

module.exports = {
  errorHandler
};