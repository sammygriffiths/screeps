const generateName = require('utilities_generateName');
const roles = require('roles_index');

let creepManager = {
    getCurrentNumbers: () => {
        let numbers = {};
        for (let i = 0; i < CREEP_ROLES.length; i++) {
            let role = CREEP_ROLES[i];
            numbers[role] = _.filter(Game.creeps, (creep) => creep.memory.role == role).length;
        }

        return numbers;
    },
    spawn: (role) => {
        let newName = generateName(role);
        console.log('Spawning new ' + role + ': ' + newName);
        return Game.spawns['Home'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: role } });
    },
    run: () => {
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            roles[creep.memory.role].run(creep);
        }
    }
};

module.exports = () => {
    let currentNumbers = creepManager.getCurrentNumbers();

    Object.keys(currentNumbers).forEach((role) => {
        if (currentNumbers[role] < 4) {
            creepManager.spawn(role);
        }
    });

    creepManager.run();
};
