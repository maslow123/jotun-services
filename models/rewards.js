const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class Rewards extends DBTable {
    constructor(
        id = '', 
        total = '',
        item = '',
        image_url = '',
        document_url = ''
    ) {
        super(id);
        this.total = total;
        this.item = item;
        this.image_url = image_url;
        this.document_url = document_url;
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
            SELECT id, total, item, image_url, document_url 
            FROM rewards
        `;

        const [rows] = await conn.query(q);
        if (rows.length < 1) {
            return [];
        }
        
        return rows;
    };
}