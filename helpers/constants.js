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

const SCAN_CODE = {
    'KEHADIRAN': 'KEHADIRAN',
    'SOUVENIR': 'SOUVENIR',
    'VOUCHER_BERMAIN': 'VOUCHER_BERMAIN',
    'SNACK': 'SNACK',
    'PAKET_SEKOLAH': 'PAKET_SEKOLAH',
    'FOTO_VIDEO': 'FOTO_VIDEO',
};

module.exports = {
    ROLES,
    ATTEND,
    BRANCH_CODE,
    SCAN_CODE
}