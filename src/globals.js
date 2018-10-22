module.exports = () => {
    global.CREEP_ROLES = {
        'harvester': {
            required: 2,
            body: [MOVE, WORK, WORK, WORK, CARRY]
        },
        'upgrader': {
            required: 3,
            body: [MOVE, WORK, CARRY]
        },
        'builder': {
            required: 2,
            body: [MOVE, WORK, CARRY]
        },
        'hauler': {
            required: 0,
            body: [MOVE, MOVE, MOVE, CARRY, CARRY]
        }
    };
}
