const DBTable = require('./dbtable').default;
const conn = require('./index');
const constants = require('../helpers/constants');

exports.default = class ScanInfo extends DBTable {
    constructor(
        id = '', 
        user_id = '',
        code = '',
        name = '',
        scan_time = 0,
        status = 0
    ) {
        super(id);
        this.user_id = user_id;    
        this.code = code;    
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
            SELECT id, user_id, code, name, scan_time, status
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
                row.code,
                row.name,
                row.scan_time,
                row.status
            );

            return scan_info;
        }))
    };

    update = async () => {
        const q = `
            UPDATE user_scan_info 
            SET 
                updated_at = IF(scan_time is not NULL, now(), NULL),
                scan_time = IF(scan_time is null, now(), scan_time),
                status = IF(status = 0, 1, 1)
            WHERE user_id = ? AND code = ?;
        `;

        const [rows] = await conn.query(q, [this.user_id, this.code]);
        if (rows.affectedRows < 1) {
            return false;
        }

        return true;
    }

    read = async () => {
        const q = `
            SELECT scan_time, status, updated_at
            FROM user_scan_info
            WHERE user_id = ? AND code = ?;
        `;

        const [rows] = await conn.query(q, [this.user_id, this.code]);
        return rows;
    };
}