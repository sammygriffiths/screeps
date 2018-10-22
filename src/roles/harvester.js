let roleHarvester = {
    run: (creep) => {
        if (!creep.memory.targetID) {
            creep.memory.targetID = roleHarvester.getTargetID(creep);
        }

        let target = Game.getObjectById(creep.memory.targetID);

        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    },
    getTargetID: (creep) => {
        let targets = creep.room.find(FIND_SOURCES);
        let otherHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

        for (let i = 0; i < otherHarvesters.length; i++) {
            let harvester = otherHarvesters[i];
            targets = _.filter(targets, (target) => harvester.memory.targetID != target.id);
        }

        return targets[0];
    }
};


module.exports = roleHarvester;