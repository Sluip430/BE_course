import { sendMessage } from '../services/sendGrid';
import { urlValidation } from './validation/url.name.validator';
import { idValidation } from './validation/id.validator';
import { setImage, getKeyById, setImageLocal } from '../database/repositories/image';

export const setImageController = async (data: any, name: string) => {
  const newObj = data;

  newObj.name = name;

  const { value, error } = urlValidation.validate(newObj, { abortEarly: false });

  if (error) return { error };

  const { error: dbError, result } = await setImage(value);

  sendMessage(value.Location);

  if (dbError) return { error: { status: 500, data: dbError } };

  return { value: { data: result, status: 201 } };
};

export const setImageLocalController = async (data: any, name: string) => {
  const { error: dbError, result } = await setImageLocal(data, name);

  console.log(result);

  sendMessage(`uploads\\${result.key}`);

  if (dbError) return { error: { status: 500, data: dbError } };

  return { result: { status: 201, data: result } };
};

export const getKeyByIdController = async (id: string) => {
  const { value, error } = idValidation.validate(id, { abortEarly: false });

  if (error) return { error: { status: 400, data: error } };

  const { error: dbError, result } = await getKeyById(value);

  if (!result) {
    return { error: { status: 500, data: 'Cant find Image with this ID' } };
  }

  if (dbError) return { error: { status: 500, data: dbError } };

  return { value: { data: result, status: 201 } };
};
