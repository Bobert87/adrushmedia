const { InvoiceStatus } = require("@prisma/client");
const InvoiceModel = require("../models/core/invoice");

/**
 * Checks for overdue invoices and updates their status if necessary.
 * @returns {Promise<void>} A promise that resolves once the update is complete.
 */
async function checkOverdueInvoices() {
	const invoiceModel = new InvoiceModel();
	const invoices = await invoiceModel.getByStatus(InvoiceStatus.SENT);
	for (const invoice of invoices) {
		const today = new Date();
		if (today > invoice.dueDate) {
			await invoiceModel.update(invoice.id, { status: InvoiceStatus.OVERDUE });
		}
	};
}

module.exports = checkOverdueInvoices;
