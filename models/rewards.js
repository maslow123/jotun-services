const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class Rewards extends DBTable {
    constructor(
        id = '', 
        user_id = '',
        item = ''
    ) {
        super(id);
        this.user_id = user_id;        
        this.item = item;
    }

    create = async () => {
        const q = `
                    INSERT INTO rewards
                    (user_id, item) 
                    VALUES 
                    (?, ?);
                `;

        const [rows] = await conn.query(q, [this.user_id, this.item]);
        this.id = rows.insertId;
    };    
    
    list = async () => {
        const q = `
            SELECT id, user_id, item 
            FROM rewards
        `;

        const [rows] = await conn.query(q);
        if (rows.length < 1) {
            return [];
        }
        return await Promise.all(rows.map(async row => {
            const rewards = new Rewards(
                row.id,
                row.user_id,
                row.item
            );

            return rewards;
        }))
    };
}