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

    updateSlots = async (listSubEventID) => {
        let str = ``;
        let counter = 0;
        for (let id of listSubEventID) {
            str += ` id = ${id}`;
            if (counter !== listSubEventID.length - 1) {
                str += ` OR `;
                counter++;
            }
        }
        const q = `
            UPDATE sub_events SET slots = slots - 1
            WHERE ${str}
        `;

        const result = await conn.query(q);
        return result;
    }
}