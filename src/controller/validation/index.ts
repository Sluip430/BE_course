exports.urlValidation = require('./url.name.validator').urlValidation;

exports.validate = (data : any, schema : any) => {
    const result = schema.validate(data, { abortEarly: false });
    if (result.error) {
        const error = { status: 400, data: result.error.message };
        return { error };
    }
    return { value: result.value };
};