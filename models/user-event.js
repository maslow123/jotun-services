const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class UserEvent extends DBTable {
    constructor(
        data = []
    ) {
        super();
        this.data = data;
    }

    create = async () => {        
        let preparedStatement = ``;
        let args = [];
        let counter = 0;

        for (let row of this.data) {
            if (counter > 0) {
                preparedStatement += `, `;
            }
            preparedStatement += `(?, ?, ?)`;
            args = [...args, row.user_id, row.sub_event_id, row.child_name];
            
            counter++;
        }

        const q = `
                    INSERT INTO user_events
                    (user_id, sub_event_id, child_name) 
                    VALUES 
                    ${preparedStatement}
                `;

        await conn.query(q, [...args]);
    };  
}