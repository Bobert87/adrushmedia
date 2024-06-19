const db = require("../db").client;

class Invoice {
	async getAll() {
		return db.invoice.findMany();
	}

	async getById(id) {
		return db.invoice.findUnique({
			where: { id: Number.parseInt(id) },
		});
	}

	async getByAdvertiserId(advertiserId) {
		return db.invoice.findMany({
			where: { adId: Number.parseInt(advertiserId) },
		});
	}

	async getByDateRange(from, to) {
		return db.invoice.findMany({
			where: {
				createdAt: {
					between: [from, to],
				},
			},
		});
	}

	async getByDateRangeAndId(from, to, id) {
		return db.invoice.findMany({
			where: {
				createdAt: { between: [from, to] },
				id: Number.parseInt(id),
			},
		});
	}

	async getByStatus(status) {
		return db.invoice.findMany({
			where: { status: status },
		});
	}

	async getByStatusAndId(status, id) {
		return db.invoice.findMany({
			where: {
				status: status,
				id: Number.parseInt(id),
			},
		});
	}
	async update(id, invoice) {
		return db.invoice.update({
			where: { id: Number.parseInt(id) },
			data: {
				...invoice,
			},
		});
	}

	async create(invoice) {
		return db.invoice.create({
			data: {
				...invoice,
			},
		});
	}

	async createMany(invoices) {
		return db.invoice.createMany({
			data: invoices,
		});
	}
}

module.exports = Invoice;
