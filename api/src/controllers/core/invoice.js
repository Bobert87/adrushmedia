const invoiceModel = require("../../models/core/invoice");
class Invoice {
	constructor() {
		this.invoice = new invoiceModel();
	}

	async getAll(req, res) {
		try {
			const invoices = await this.invoice.getAll();
			res.json(invoices);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getById(req, res) {
		try {
			const invoice = await this.invoice.getById(req.params.id);
			res.json(invoice);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByAdvertiserId(req, res) {
		try {
			const invoices = await this.invoice.getByAdvertiserId(
				req.params.advertiserId,
			);
			res.json(invoices);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByDateRange(req, res) {
		try {
			const invoices = await this.invoice.getByDateRange(
				req.params.from,
				req.params.to,
			);
			res.json(invoices);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async getByStatus(req, res) {
		try {
			const invoices = await this.invoice.getByStatus(req.params.status);
			res.json(invoices);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	async create(req, res) {
		try {
			const invoice = req.body;
			const createdInvoice = await this.invoice.create(invoice);
			res.json(createdInvoice);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = Invoice;
