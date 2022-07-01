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
    }
}