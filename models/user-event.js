const DBTable = require('./dbtable').default;
const conn = require('./index');

exports.default = class UserEvent extends DBTable {
    constructor(
        user_id = '',
        data = []
    ) {
        super();
        this.user_id = user_id;
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
            args = [...args, this.user_id, row.sub_event_id, row.child_name];
            
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

    checkChildrenRegistered = async () => {        
        const children = this.data.map(d => d.child_name);
        const ids = `('${children.join("','")}')`;

        const q = `
            SELECT COUNT(1) count 
            FROM user_events
            WHERE user_id = ? AND child_name IN ${ids}
        `;

        const [data] = await conn.query(q, this.user_id);
        if (data[0].count > 0) {
            return true;
        }
        return false;
    };
}