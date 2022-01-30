import { pgClient } from '../database';

export const setImage = async (data: any) => {
  const { name, Location: url, key } = data;
  const pgQuery = `
        INSERT INTO images (name, url, key , save_type)
        VALUES ('${name}', '${url}', '${key}', 's3')
        RETURNING *
    `;

  try {
    const result = await pgClient.query(pgQuery);

    return { result: result.rows[0] };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const setImageLocal = async (data: any, name: string) => {
  const { path, filename } = data;
  const pgQuery = `
        INSERT INTO images (name, url, key , save_type)
        VALUES ('${name}', '${path}','${filename}', 'local' )
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
        SELECT key, save_type
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
