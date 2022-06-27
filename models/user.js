const DBTable = require('./dbtable').default;
const conn = require('./index');
const { generatePassword } = require('../helpers');

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
        qr_code_url = '',
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
        this.qr_code_url = qr_code_url;
    }

    create = async () => {
        const { password, hashedPassword } = await generatePassword();
        this.password = password;
        const q = `
                    INSERT INTO users 
                    (name, phone_number, password, department, branches, transportation, level, family_list, qr_code_url) 
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;

        const [rows] = await conn.query(q, [this.name, this.phone_number, hashedPassword, this.department, this.branches, this.transportation, this.level, `[${this.family_list}]`, this.qr_code_url]);
        this.id = rows.insertId;
    };

    login = async () => {
        const q = `
            SELECT id, name, phone_number, password, department, branches, transportation, level, family_list
            FROM users
            WHERE phone_number = ?
        `;

        const [rows] = await conn.query(q, [this.phone_number]);
        if (rows.length < 1) {
            return false;
        }

        const data = rows[0];
        for(let fields of Object.keys(data)) {
            this[fields] = data[fields];
        }
        return true;
    };

    userAlreadyExists = async () => {
        const q = `
            SELECT COUNT(phone_number) count FROM users WHERE phone_number = ?
        `;

        const [data] = await conn.query(q, [this.phone_number]);        
        if (data[0].count > 0) {
            return true;
        }
        return false
    }
}