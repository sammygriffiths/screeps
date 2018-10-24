module.exports = () => {
    global.CREEP_ROLES = {
        'harvester': {
            required: 4,
            body: [MOVE, WORK, WORK, CARRY]
        },
        'upgrader': {
            required: 3,
            body: [MOVE, WORK, CARRY]
        },
        'builder': {
            required: 2,
            body: [MOVE, WORK, CARRY]
        },
        'repairer': {
            required: 1,
            body: [MOVE, WORK, WORK, CARRY]
        }
    };
}
