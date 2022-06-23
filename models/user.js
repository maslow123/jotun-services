const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class User extends DBTable {
    constructor(
        id = '', 
        name = '', 
        phone_number = '', 
        password = '',
        department = '',
        branches = '',
        transportation = '',
        level = 0,
        family_list = '',
        created_at = 0,
        updated_at = 0
    ) {
        super(id, created_at, updated_at);
        this.name = name;
        this.phone_number = phone_number;
        this.password = password;
        this.department = department;
        this.branches = branches;
        this.transportation = transportation;
        this.level = level;
        this.family_list = family_list;
    }

    create = async () => {
        const q = `
                    INSERT INTO users 
                    (name, phone_number, password, department, branches, transportation, level, family_list) 
                    VALUES 
                    (?, ?, 'xxx', ?, ?, ?, ?, ?);
                `;
        
        const [rows] = await conn.query(q, [this.name, this.phone_number, this.department, this.branches, this.transportation, this.level, `[${this.family_list}]`]);
        conn.end();
        this.id = rows.insertId;
    };
}