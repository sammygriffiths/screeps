let roles = {};

for (let i = 0; i < CREEP_ROLES.length; i++) {
    roles[CREEP_ROLES[i]] = require('roles_' + CREEP_ROLES[i]);
}

module.exports = roles
