const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class SubEvent extends DBTable {
    constructor(
        id = '', 
        event_id = '',
        start_time = 0,
        end_time = 0,
        slots = 0
    ) {
        super(id);
        this.event_id = event_id;        
        this.start_time = start_time;
        this.end_time = end_time;
        this.slots = slots;
    }

    create = async () => {
        const q = `
                    INSERT INTO sub_events
                    (event_id, start_time, end_time, slots) 
                    VALUES 
                    (?, ?, ?, ?);
                `;

        const [rows] = await conn.query(q, [this.event_id, this.start_time, this.end_time, this.slots]);
        this.id = rows.insertId;
    };  
    
    read = async () => {
        const q = `
            SELECT id, event_id, start_time, end_time, slots
            FROM sub_events
            WHERE event_id = ?
        `;

        const [rows] = await conn.query(q, [this.event_id]);
        return rows;
    };

    updateSlots = async (subEventID) => {       
        const q = `
            UPDATE sub_events SET slots = slots - 1
            WHERE id = ?
        `;

        const result = await conn.query(q, [subEventID]);
        return result;
    };

    getSubEventByID = async () => {
        const q = `
            SELECT 
                se.id, se.event_id, se.start_time, se.end_time, se.slots,
                e.category_age, e.name event_name
            FROM sub_events se
            JOIN events e ON e.id = se.event_id
            WHERE se.id = ?
        `;

        const [rows] = await conn.query(q, [this.id]);
        return rows;
    };
}