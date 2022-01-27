import { pgClient } from '../database';

export const setImage = async (data : any) => {
    const {name , Location : url} = data
    const pgQuery = `
        INSERT INTO images (name, url)
        VALUES ('${name}', '${url}');
    `;

    try {
        const result = await pgClient.query(pgQuery);
        return { result };
    } catch (error : any) {
        return { error: error.message };
    }
};

module.exports = { setImage }