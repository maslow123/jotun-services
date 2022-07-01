const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class Schedule extends DBTable {
    constructor(
        id = '', 
        date = '',
        zoom_link = '',
        schedule_list = ''
    ) {
        super(id);
        this.date = date;
        this.zoom_link = zoom_link;
        this.schedule_list = schedule_list;
    }

    create = async () => {
        let preparedStatement = ``;
        let args = [];
        let counter = 0;

        /*
            Schedule list format:
                "schedule_list": [
                    {
                        "description": "Test 1",
                        "time_start": "07:00:00",
                        "time_end": "08:00:00"
                    },
                    {
                        "description": "Test 2",
                        "time_start": "08:00:00",
                        "time_end": "09:00:00"
                    }
                ]
        */
        for (let row of this.schedule_list) {
            if (counter > 0) {
                preparedStatement += `, `;
            }
            preparedStatement += `(?, ?, ?, ?, ?)`;
            args = [...args, row.description, this.date, row.time_start, row.time_end, this.zoom_link];
            
            counter++;
        }

        const q = `
                    INSERT INTO schedules
                    (description, date, time_start, time_end, zoom_link) 
                    VALUES 
                    ${preparedStatement}
                `;

        await conn.query(q, [...args]);
    };   
    
    list = async () => {
        const q = `
            SELECT id, description, date, time_start, time_end, zoom_link, status
            FROM schedules
            WHERE date = ?
        `;

        const [rows] = await conn.query(q, this.date);
        return rows;
    }
}