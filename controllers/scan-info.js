require('dotenv').config();
const ScanInfo = require('../models/scan-info').default;
const Family = require('../models/family').default;
const User = require('../models/user').default;
const response = require('../helpers/response');
const jwt = require('jsonwebtoken');
const constants = require('../helpers/constants');
const excelJS = require("exceljs");

const updateScanInfo = async (req, res) => {
    try {        
        const { key, code } = req.body;      
        if(!key) {            
            return response.falseRequirement(res, 'key');
        }
        // decoded jwt to get user data        
        const decoded = jwt.verify(key, process.env.JWT_SECRET, {
            ignoreExpiration: true
        });
        if (!decoded) {
            return response.falseRequirement(res, 'key');
        }

        const { phone_number } = decoded;

        // get user data based on phone_number
        const user = new User('', '', phone_number);
        const isValid = await user.login();
        if (!isValid) {
            return response.errorScan(res, 'invalid-qr-code');
        }

        const data = {
            user,
            children: []
        };
        // get scan items
        const scan_info = new ScanInfo('', user.id, code);
        const items = await scan_info.list();
        if (items.length < 1) {
            return response.errorScan(res, 'items-not-found');
        }

        if (code !== constants.SCAN_CODE.KEHADIRAN) {
            // check status kehadiran is scanned or not.
            const kehadiran = items.find(item => item.code === constants.SCAN_CODE.KEHADIRAN);
            if (kehadiran?.status === 0) {
                return response.errorScan(res, 'invalid-attendance', data);
            }
        }
        const item = items.filter(item => item.code === code);
        if(item.length < 1) {
            return response.errorScan(res, 'invalid-code');
        } 

        // check valid children item
        let children = [];
        const family = new Family('', user.id);
        if (code === 'SNACK') {
            const startAge = 1;
            const endAge = 12;
            children = await family.checkValidChildren(startAge, endAge);    
        }
        if (code === 'PAKET_SEKOLAH') {
            const startAge = 3;
            const endAge = 18;
            children = await family.checkValidChildren(startAge, endAge);            
        }
        
        if (children.length < 1 && (code === 'SNACK' || code === 'PAKET_SEKOLAH')) {
            return response.errorScan(res, 'invalid-children-age', data);
        }

        const state = item[0].status === 1 ? 'update' : 'new';
        const isSuccess = await scan_info.update();
        if (!isSuccess) {
            return response.errorScan(res, 'something wrong');
        }     
        
        data.children = children;    
        return response.successScan(res, state, data);
    } catch (error) {
        console.error(error);
        response.internalError(res, error.message);
    }
};

const recapScanInfo = async (req, res) => {
    try {
        const scan_info = new ScanInfo();
        const data = await scan_info.list();        
        const normalizeData = await normalizedData(data);
        /*
        "data": [
            {
                "phone_number": "62816834631",
                "name": "Zenitha fitriati",
                "items": [
                    {
                        "item": "KEHADIRAN",
                        "scan_time": null,
                        "status": "Belum ditukar"
                    },
                    {
                        "item": "SOUVENIR",
                        "scan_time": null,
                        "status": "Belum ditukar"
                    },
                    {
                        "item": "VOUCHER BERMAIN",
                        "scan_time": null,
                        "status": "Belum ditukar"
                    },
                    {
                        "item": "SNACK",
                        "scan_time": null,
                        "status": "Belum ditukar"
                    },
                    {
                        "item": "PAKET SEKOLAH",
                        "scan_time": null,
                        "status": "Belum ditukar"
                    },
                    {
                        "item": "FOTO",
                        "scan_time": null,
                        "status": "Belum ditukar"
                    },
                    {
                        "item": "VIDEO",
                        "scan_time": null,
                        "status": "Belum ditukar"
                    }
                ]
            },
        ]
        */
        // write and download excel
        const workbook = new excelJS.Workbook();  // Create a new workbook
        const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
        const path = "./files";  // Path to download excel
        // Column for data in excel. key must match data key
        worksheet.columns = [
          { header: "No", key: "no" }, 
          { header: "Nomor WA", key: "phone_number" },
          { header: "Nama", key: "name"},
          { header: "Date", key: "date" },
          { header: "Waktu Kehadiran", key: "attend_scan_time" },
          { header: "Waktu Suvenir", key: "souvenir_scan_time" },
          { header: "Waktu Snack", key: "snack_scan_time" },
          { header: "Waktu Voucher Bermain", key: "voucher_scan_time" },
          { header: "Waktu Paket Sekolah", key: "school_package_scan_time" },
          { header: "Waktu Foto", key: "photo_scan_time" },
          { header: "Waktu Vidio", key: "video_scan_time" }
        ];

        // Looping through User data
        let counter = 1;
        normalizeData.data.forEach((data) => {
            data.no = counter;
            data.date = new Date();
            data.attend_scan_time = '';
            data.souvenir_scan_time = '';
            data.snack_scan_time = '';
            data.voucher_scan_time = '';
            data.school_package_scan_time = '';
            data.photo_scan_time = '';
            data.video_scan_time = '';

            data.items.forEach(d => {
                switch(d.item) {
                    case 'KEHADIRAN':
                        data.attend_scan_time = d.scan_time || '-';
                        break;
                    case 'SOUVENIR':
                        data.souvenir_scan_time = d.scan_time || '-';
                        break;
                    case 'VOUCHER_BERMAIN':
                        data.voucher_scan_time = d.scan_time || '-';
                        break;
                    case 'SNACK':
                        data.snack_scan_time = d.scan_time || '-';
                        break;
                    case 'PAKET_SEKOLAH':
                        data.school_package_scan_time = d.scan_time || '-';
                        break;
                    case 'FOTO':
                        data.photo_scan_time = d.scan_time || '-';
                        break;
                    case 'VIDEO':
                        data.video_scan_time = d.scan_time || '-';
                        break;
                }
            });            
            worksheet.addRow(data); 

            counter++;
        });
        // Making first line in excel bold
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        const date = new Date().getTime();
        const files = await workbook.xlsx.writeFile(`${path}/RECAP_SCAN_INFO-${date}.xlsx`);
        console.log(files)        
        return response.success(res, normalizeData);

    } catch(err) {
        console.error(err);
        response.internalError(res, err.message);
    }
};

const normalizedData = async (data) => {
    // expected data
    const result = {
        data: Object.values(
            data.reduce( (acc, { id, uid, phone_number, name, item, scan_time, status }) => {
                (acc[phone_number+name] = acc[phone_number+name] || {phone_number, name, items: []})
                    .items.push({item, scan_time, status});
                return acc;
            }, {} )
        )
    };

    return result;
    
};



module.exports = {
    updateScanInfo,
    recapScanInfo
};