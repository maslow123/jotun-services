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

module.exports = {
    ROLES,
    ATTEND,
    BRANCH_CODE
}