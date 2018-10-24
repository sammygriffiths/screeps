let roles = {};

Object.keys(CREEP_ROLES).forEach((role) => {
    roles[role] = require('roles_' + role);
});

module.exports = roles