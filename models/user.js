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
        transportation = null,
        level = 0,
        qr_code_url = '',
        invitation_url = '',
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
        this.qr_code_url = qr_code_url;
        this.invitation_url = invitation_url;
    }

    create = async () => {
        const { password, hashedPassword } = await generatePassword();
        this.password = password;
        const q = `
                    INSERT INTO users 
                    (name, phone_number, password, department, branches, transportation, level, qr_code_url, invitation_url) 
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?);
                `;

        const [rows] = await conn.query(q, [this.name, this.phone_number, hashedPassword, this.department, this.branches, this.transportation, this.level, this.qr_code_url, this.invitation_url]);
        this.id = rows.insertId;
    };

    login = async () => {
        const q = `
            SELECT id, name, phone_number, password, department, branches, level, qr_code_url
            FROM users
            WHERE phone_number = ?
            ORDER BY id desc
            LIMIT 1
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
    };

    checkValidChildren = async (data) => {
        let q = `SELECT family_list FROM users WHERE id = ?`;
        const [rows] = await conn.query(q, [this.id]);
        if (rows.length < 1) {
            return [];
        }
        const row = rows[0];
        let family = JSON.parse(row.family_list);
        const children = family.splice(1, family.length - 1); // only get children
        let childrenRegistered = [];

        // if child registration > child registered = false
        if (data.length > children) {
            return [];
        }

        // only 1 child for 1 sub event
        const hasDuplicate = (arrayObj, colName) => {
            var hash = Object.create(null);
            return arrayObj.some((arr) => {
               return arr[colName] && (hash[arr[colName]] || !(hash[arr[colName]] = true));
            });
        };
        if (hasDuplicate(data, 'child_name')) {
            return [];
        }

        // check children is valid or not
        for(let d of data) {
            for (let child of children) {
                if ((d.child_name.toUpperCase() === child.name.toUpperCase()) && !(childrenRegistered.includes(d.child_name))) {
                    childrenRegistered = [...childrenRegistered, child.name]
                }
            }
        }
        
        if (childrenRegistered.length < 1 || (childrenRegistered.length > children.length)) {
            return [];
        }
        
        data = data.filter(d => childrenRegistered.includes(d.child_name));
        return data;
    };

    checkUserAttend = async () => {
        const q = `SELECT is_attend FROM users WHERE phone_number = ?`;
        const [rows] = await conn.query(q, [this.phone_number]);
        if (rows.length < 1) {
            return [];
        }

        return rows;
    }

    updateUserAttend = async (isAttend) => {
        const q = `UPDATE users SET is_attend = ? WHERE phone_number = ?`;
        await conn.query(q, [isAttend, this.phone_number]);
    }

    updateUserImage = async () => {
        const q = `
            UPDATE users SET qr_code_url = ?, invitation_url = ?
            WHERE id = ?
        `;

        await conn.query(q, [this.qr_code_url, this.invitation_url, this.id]);
    }
}