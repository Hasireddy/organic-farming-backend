const ErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ error: err.message });
};


module.exports = ErrorHandler;