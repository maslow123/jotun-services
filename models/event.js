const DBTable = require('./dbtable').default;
const SubEvent = require('./sub-event').default;
const conn = require('./index');

exports.default = class Event extends DBTable {
    constructor(
        id = '', 
        name = ''
    ) {
        super(id);
        this.name = name;        
    }

    create = async () => {
        const q = `
                    INSERT INTO events
                    (name) 
                    VALUES 
                    (?);
                `;

        const [rows] = await conn.query(q, [this.name]);
        this.id = rows.insertId;
    };    
    
    list = async () => {
        const q = `
            SELECT id, name 
            FROM events e
        `;

        const [rows] = await conn.query(q);
        if (rows.length < 1) {
            return [];
        }
        return await Promise.all(rows.map(async row => {
            const events = new Event(
                row.id,
                row.name
            );
            const sub_event = new SubEvent('', row.id);
            events.sub_events = await sub_event.read();

            return events;
        }))
    };
}