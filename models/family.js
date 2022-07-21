const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class Family extends DBTable {
    constructor(
        id = '', 
        user_id = '',
        family_list = ''
    ) {
        super(id);
        this.user_id = user_id;
        this.family_list = family_list;
    }

    create = async () => {
        let preparedStatement = ``;
        let args = [];
        let counter = 0;

        for (let row of this.family_list) {
            if (counter > 0) {
                preparedStatement += `, `;
            }
            preparedStatement += `(?, ?, ?, ?)`;
            args = [...args, this.user_id, row.name, row.age, counter];
            
            counter++;
        }

        const q = `
                    INSERT INTO family
                    (user_id, name, age, status) 
                    VALUES 
                    ${preparedStatement}
                `;

        await conn.query(q, [...args]);
    };   
    
    list = async () => {
        const q = `
            SELECT id, name, age, status
            FROM family
            WHERE user_id = ?
        `;

        const [rows] = await conn.query(q, this.user_id);
        return rows;
    };

    getFamilyByID = async () => {
        const q = `
            SELECT id, name, age, status
            FROM family
            WHERE id = ? AND user_id = ? 
        `;
        
        const [rows] = await conn.query(q, [this.id, this.user_id]);         
        return rows;
    };

    checkValidChildren = async (startAge, endAge = null) => {
        const q = `
            SELECT name, age FROM family
            WHERE user_id = ? AND status != 0 AND (age <= ${endAge} AND age >= ${startAge})
        `;

        const [rows] = await conn.query(q, [this.user_id]);
        return rows;
    };

    update = async () => {    
        
        for(let [i, row] of this.family_list.entries()) {            
            // if data is exists but name is empty, delete it!
            if (row.id && row.name ==='') {
                const q = `
                    DELETE FROM family where id = ?
                `
                await conn.query(q, row.id);
                continue;
            } else {
                // if doesnt have id buat have name, create it!
                if (!row.id && row.name) {
                    const q = `
                        INSERT INTO family
                        (user_id, name, age, status)
                        VALUE
                        (?, ?, ?, ?)
                    `;

                    await conn.query(q, [this.user_id, row.name, row.age, i])
                    continue;
                }
                // if have id and name, update it
                if (row.id && row.name) {
                    const q = `
                        UPDATE family
                        SET name = ?, age = ?
                        WHERE id = ?
                    `;
                    await conn.query(q, [row.name, row.age, row.id]);
                    continue;
                }
            }
        }
    }
}