let roleHauler = {
    run: (creep) => {
        creep.memory.withdrawing = roleHauler.isWithdrawing(creep);
        creep.memory.targetID = roleHauler.getTargetID(creep);

        let target = Game.getObjectById(creep.memory.targetID);

        let currentJob = (creep.memory.withdrawing) ? 'withdraw' : 'transfer';

        if (creep.saying != currentJob) {
            creep.say(currentJob);
        }

        if (creep[currentJob](target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    },
    isWithdrawing: (creep) => {
        if (creep.memory.withdrawing && creep.carry.energy == creep.carryCapacity) {
            return false;
        } else if (!creep.memory.withdrawing && creep.carry.energy == 0) {
            return true;
        }
    },
    getTargetID: (creep) => {
        let targetID = 0;
        let targets = [];

        let currentTargetID = creep.memory.targetID;
        let currentTarget = {
            structureType: null
        };

        if (currentTargetID) {
            currentTarget = Game.getObjectById(currentTargetID);
        }

        if (creep.memory.withdrawing && currentTarget.structureType != STRUCTURE_CONTAINER) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.energy > 0;
                }
            });
        } else if (!creep.memory.withdrawing && (currentTarget.structureType != STRUCTURE_EXTENSION && currentTarget.structureType != STRUCTURE_SPAWN)) {
            targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
        } else {
            targetID = currentTargetID;
        }

        if (targets.length) {
            targetID = targets[Math.floor(Math.random() * targets.length)].id;
        }

        return targetID;
    }
};

module.exports = roleHauler;
