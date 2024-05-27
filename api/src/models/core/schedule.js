const db = require('../db').client;

class Schedule {
    async create(schedule, scheduleDetails) {
        return db.schedule.create({
            data: {
                ...schedule,
                scheduleDetails: {
                    create: [
                        ...scheduleDetails
                    ]
                }
            },
        });        
    }

    async getScheduleByDeviceId(deviceId) {
        return db.schedule.findMany({
            where: { deviceId: parseInt(deviceId)},
            orderBy: {createdAt: 'desc'},
            take: 1,
            include: {
                scheduleDetails: true
            }
        });
    }
}

module.exports = Schedule;