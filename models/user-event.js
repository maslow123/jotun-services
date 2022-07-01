const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class UserEvent extends DBTable {
    constructor(
        user_id = 0,
        family_id = 0,
        sub_event_id = 0
    ) {
        super();
        this.user_id = user_id;
        this.family_id = family_id;
        this.sub_event_id = sub_event_id;
    }

    create = async () => {               
        const q = `
                    INSERT INTO user_events
                    (family_id, sub_event_id) 
                    VALUES 
                    (?, ?)
                `;

        await conn.query(q, [this.family_id, this.sub_event_id]);
    };  

    checkChildrenRegistered = async () => {   
        const q = `
            SELECT COUNT(1) count
            FROM user_events ue
            JOIN family f ON f.id = ue.family_id
            WHERE f.user_id = ?
        `;
        
        const [rows] = await conn.query(q, [this.user_id]);
        return rows[0].count;
    };

    getUserEvent = async () => {
        const q = `
            SELECT 
                f.name, f.age                
            FROM user_events ue
            JOIN family f ON f.id = ue.family_id 
            JOIN users u ON u.id = f.user_id 
            WHERE u.id = ? AND ue.sub_event_id = ?
        `;

        const [rows] = await conn.query(q, [this.user_id, this.sub_event_id]);
        return rows;
    }
}