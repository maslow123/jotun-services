const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class ConfirmInvitation extends DBTable {
    constructor(
        id = '', 
        user_id = '',
        phone_number = ''
    ) {
        super(id);
        this.user_id = user_id;
        this.phone_number = phone_number;
    }

    create = async () => {
        // upsert data
        const q = `
            INSERT INTO confirm_invitation
            (user_id, time)              
            VALUES
            (?, TIMESTAMPADD(SECOND, 30, now()))              
        `;
        const [rows] = await conn.query(q, this.user_id)
        if (rows.affectedRows < 1) {
            return false;
        }
        return true;
    };   
    
    update = async () => {
        const q = `
            UPDATE confirm_invitation ci SET counter = counter + 1, time = TIMESTAMPADD(SECOND, 30, NOW())
            WHERE user_id = (SELECT id FROM users WHERE phone_number = ?) and NOW() > time;
        `
        const [rows] = await conn.query(q, this.phone_number)
        if (rows.affectedRows < 1) {
            return 'Harap tunggu beberapa saat lagi..'
        }
        return 'OK';
    }
}