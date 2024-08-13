// Custom error that can be passed by the middleware to prevent the repetition of typing error
export const errorHandler = (statusCode, message) => {
    const error =new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};
