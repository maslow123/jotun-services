const DBTable = require('./dbtable').default;
const SubEvent = require('./sub-event').default;
const conn = require('./index');

exports.default = class Event extends DBTable {
    constructor(
        id = '', 
        name = '',
        category_age = '',
        banner = ''
    ) {
        super(id);
        this.name = name;        
        this.category_age = category_age;
        this.banner = banner;
    }

    create = async () => {
        const q = `
                    INSERT INTO events
                    (name, category_age, banner) 
                    VALUES 
                    (?, ?, ?);
                `;

        const [rows] = await conn.query(q, [this.name, this.category_age, this.banner]);
        this.id = rows.insertId;
    };    
    
    list = async () => {
        const q = `
            SELECT id, name, category_age, banner 
            FROM events e
        `;

        const [rows] = await conn.query(q);
        if (rows.length < 1) {
            return [];
        }
        return await Promise.all(rows.map(async row => {
            const events = new Event(
                row.id,
                row.name,
                row.category_age,
                row.banner
            );
            const sub_event = new SubEvent('', row.id);
            events.sub_events = await sub_event.read();

            return events;
        }))
    };
}