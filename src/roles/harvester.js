let roleHarvester = {
    run: (creep) => {
        if (!creep.memory.targetID) {
            creep.memory.targetID = roleHarvester.getTargetID(creep);
        }
        
        if (creep.memory.targetID === -1) {
            return creep.suicide(); // If a creep has -1 for a target ID that means it's unneeded.
        }

        creep.memory.repairing = roleHarvester.isRepairing(creep);

        let currentJob = (creep.memory.repairing) ? 'repair' : 'harvest';

        if (creep.saying != currentJob) {
            creep.say(currentJob);
        }
        
        let target = Game.getObjectById(creep.memory.targetID);

        if (creep.memory.repairing) {
            target = roleHarvester.getClosestContainer(creep);
        }
        
        if (creep[currentJob](target) == ERR_NOT_IN_RANGE) {
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

        if (!targets[0]) {
            return -1;
        }

        return targets[0].id;
    },
    getClosestContainer: (creep) => {
        let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER;
            }
        });

        let closestTargets = _.sortBy(targets, target => creep.pos.getRangeTo(target));
        return closestTargets[0];
    },
    isRepairing: (creep) => {
        let container = roleHarvester.getClosestContainer(creep);
        let needsRepairing = container.hits < (container.hitsMax / 1.5);
        let shouldRepair = (creep.carry.energy == creep.carryCapacity) || creep.memory.repairing;
        return needsRepairing && shouldRepair;
    }
};


module.exports = roleHarvester;