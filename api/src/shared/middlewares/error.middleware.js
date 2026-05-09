import { ZodError } from 'zod';
export const globalErrorHandler = (err, req, res, next) => {
    console.error('Error Stack:', err.stack);
    if (err instanceof ZodError) {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
        });
    }
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        error: message
    });
};
//# sourceMappingURL=error.middleware.js.map