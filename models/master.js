const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class Master extends DBTable {
    constructor(
        id = '', 
        name = '',
        table_name = ''
    ) {
        super(id);
        this.name = name;        
        this.table_name = table_name; 
    } 
    
    list = async () => {
        const q = `
            SELECT id, name 
            FROM ??
            ORDER by name ASC
        `;

        const [rows] = await conn.query(q, this.table_name);
        if (rows.length < 1) {
            return [];
        }

        return rows;
        
    };
}