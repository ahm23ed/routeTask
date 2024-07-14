
const dataMethods = ['body', 'params', 'query', 'headers'];
export const validation = (schema) => {
    return (req, res, next) => {
        const validationErrors = [];
        
        dataMethods.forEach(key => {
            if (schema[key]) {
                console.log(`Validating: ${key}`);
                
                const validationResult = schema[key].validate(req[key], { abortEarly: false });
                if (validationResult?.error?.details) {
                    
                    validationErrors.push(...validationResult.error.details);
                }
            }
        });
        if (validationErrors.length) {
            return res.status(400).json({
                message: validationErrors.map(err => err.message).join(', ')
            });
        }
        // if (validationErrors.length) {
        //     return res.status(400).json({
        //         message: "Validation error",
        //         errors: validationErrors.map(err => ({
        //             message: err.message
                    
        //         }))
        //     });
        // }
        next();
    };
};
