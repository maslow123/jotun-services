const DBTable = require('./dbtable').default;
const conn = require('./index');
const constants = require('../helpers/constants');

exports.default = class ScanInfo extends DBTable {
    constructor(
        id = '', 
        user_id = '',
        name = '',
        scan_time = 0,
        status = 0
    ) {
        super(id);
        this.user_id = user_id;        
        this.name = name;
        this.scan_time = scan_time;
        this.status = status;
    }

    create = async () => {
        const q = `
                    INSERT INTO user_scan_info
                    (user_id, code, name) 
                    VALUES 
                    (?, '${constants.SCAN_CODE.KEHADIRAN}', 'KEHADIRAN'),
                    (?, '${constants.SCAN_CODE.SOUVENIR}', 'SOUVENIR'),
                    (?, '${constants.SCAN_CODE.VOUCHER_BERMAIN}', 'VOUCHER BERMAIN'),
                    (?, '${constants.SCAN_CODE.SNACK}', 'SNACK'),
                    (?, '${constants.SCAN_CODE.PAKET_SEKOLAH}', 'PAKET SEKOLAH'),
                    (?, '${constants.SCAN_CODE.FOTO_VIDEO}', 'FOTO VIDEO')
                `;

        const [rows] = await conn.query(q, [this.user_id, this.user_id, this.user_id, this.user_id, this.user_id, this.user_id ]);
        this.id = rows.insertId;
    };    
    
    list = async () => {
        const q = `
            SELECT id, user_id, name, scan_time, status
            FROM user_scan_info
            WHERE user_id = ?
        `;

        const [rows] = await conn.query(q, [this.user_id]);
        if (rows.length < 1) {
            return [];
        }
        return await Promise.all(rows.map(async row => {
            const scan_info = new ScanInfo(
                row.id,
                row.user_id,
                row.name,
                row.scan_time,
                row.status
            );

            return scan_info;
        }))
    };
}