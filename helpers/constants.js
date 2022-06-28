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
}
module.exports = {
    ROLES,
    ATTEND
}