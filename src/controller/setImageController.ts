import { sendMessage } from '../services/sendGrid';
import { urlValidation } from './validation/url.name.validator';
import { idValidation } from './validation/id.validator';
import { setImage, getKeyById } from '../database/repositories/image';

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

export const getKeyByIdController = async (id: string) => {
  const { value, error } = idValidation.validate(id, { abortEarly: false });
  if (error) return { error };

  const { error: dbError, result } = await getKeyById(value);

  if (dbError) return { error: { status: 500, data: dbError } };

  return { value: { data: result, status: 201 } };
};
