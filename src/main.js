const roles = require('roles_index');

module.exports.loop = () => {
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    let builder    = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    let upgrader   = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(harvesters.length < 3) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Home'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    if (builder.length < 3) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Home'].spawnCreep([WORK,CARRY,MOVE], newName,
            { memory: { role: 'builder'}});
    }

    if (upgrader.length < 3) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Home'].spawnCreep([WORK,CARRY,MOVE], newName,
            { memory: { role: 'upgrader'}});
    }

    if(Game.spawns['Home'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Home'].spawning.name];
        Game.spawns['Home'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Home'].pos.x + 1,
            Game.spawns['Home'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        switch (creep.memory.role) {
            case 'harvester':
                roles.harvester.run(creep);
                break;
            case 'upgrader':
                roles.upgrader.run(creep);
                break;
            case 'builder':
                roles.builder.run(creep);
                break;
            default:
                console.log(name + ' has no role');
                break;
        }
    }
}