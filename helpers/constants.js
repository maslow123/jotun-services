const ROLES = {
    USERS: 0,
    HELPDESK: 1
};

const ATTEND = (name, state) => {
    const status = {
        0: `User ${name} successfully attended the event`,
        1: `User ${name} have attended the event`
    };

    return status[`${state}`];
};

const BRANCH_CODE = {
    'JAKARTA_AND_TANGERANG': 1
};

const BRANCHES = {
    '1': 'Jakarta & Tangerang',
    '2':'Pekanbaru',
    '3':'Palembang',
    '4':'Makassar',
    '5':'Medan',
    '6':'Surabaya',
    '7':'Batam',
    '8':'Balikpapan'
};

const DEPARTMENTS = {
    '1': 'Decorative Project',
    '2': 'Decorative Retail',
    '3': 'Factory Operations',
    '4': 'Finance & IT',
    '5': 'HR & GA',
    '6': 'Marine',
    '7': 'Marketing',
    '8': 'Powder Sales',
    '9': 'Protective',
    '10': 'Supply Chain',
    '11': 'TSS',
    '12': 'Factory Paints',
    '13': 'Factory Powder',
    '14': 'Maintenance',
    '15': 'Management',
    '17': 'QHSE',
    '18': 'Warehouse',
};

const SCAN_CODE = {
    'KEHADIRAN': 'KEHADIRAN',
    'SOUVENIR': 'SOUVENIR',
    'VOUCHER_BERMAIN': 'VOUCHER_BERMAIN',
    'SNACK': 'SNACK',
    'PAKET_SEKOLAH': 'PAKET_SEKOLAH',
    'FOTO': 'FOTO',
    'VIDEO': 'VIDEO',
    'FOTO_VIDEO': 'FOTO VIDEO'
};

module.exports = {
    ROLES,
    ATTEND,
    BRANCH_CODE,
    SCAN_CODE,
    BRANCHES,
    DEPARTMENTS
};