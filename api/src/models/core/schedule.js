const db = require("../db").client;

class Schedule {
	async create(device, scheduleDetails) {
		return db.schedule.create({
			data: {
				deviceId: device.id,
				latitude: device.location.lat,
				longitude: device.location.lng,
				scheduleDetails: {
					createMany: {
						data: scheduleDetails.map((scheduleDetail) => {
							return { adId: scheduleDetail };
						}),
					},
				},
			},
			include: {
				scheduleDetails: {
					include: {
						ad: true,
					},
				},
			},
		});
	}

	async getScheduleByDeviceId(deviceId) {
		return db.schedule.findFirst({
			where: { deviceId: Number.parseInt(deviceId) },
			orderBy: { createdAt: "desc" },
			include: {
				scheduleDetails: true,
			},
		});
	}
}

module.exports = Schedule;
