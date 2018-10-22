require('globals')();

const utilities = require('utilities_index');

module.exports.loop = () => {
    utilities.clearNames();
    utilities.manageCreeps();
}