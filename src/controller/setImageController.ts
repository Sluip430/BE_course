const validators = require('./validation');
const { setImage } = require('../database/repositories/image');
const { sendMessage } = require('../services/sendGrid');

export const setImageController = async (data : any) => {
    const { value, error } = validators.validate(data, validators.urlValidation);
    if (error) return { error };

    const { error: dbError, result } = await setImage(value);
    sendMessage(value.Location);


    if (dbError) return { error: { status: 500, data: dbError } };
    return { value: { data: result, status: 201 } };
};