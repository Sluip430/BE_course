import { pgClient } from '../database';

export const setImage = async (data: any) => {
  const { name, Location: url, key } = data;
  const pgQuery = `
        INSERT INTO images (name, url, key)
        VALUES ('${name}', '${url}', '${key}')
        RETURNING *
    `;

  try {
    const result = await pgClient.query(pgQuery);

    return { result: result.rows[0] };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getKeyById = async (idObj: any) => {
  const pgQuery = `
        SELECT key
        From images
        WHERE id = ${idObj.id}
    `;

  try {
    const result = await pgClient.query(pgQuery);

    return { result: result.rows[0] };
  } catch (error: any) {
    return { error: error.message };
  }
};
