const AdImpressionModel = require("../models/core/adImpression");
const AdvertiserModel = require("../models/demand/advertiser");
const InvoiceModel = require("../models/core/invoice");
const { Term } = require("@prisma/client");
const { logger } = require("../utils/loggers");
const { groupByKey } = require("../utils/groupByKey");


/**
 * Returns the number of days based on the given term.
 *
 * @param {string} term - The term to calculate the number of days for.
 * @returns {number} The number of days based on the given term.
 */
function getDaysFromTerm(term) {
	switch (term) {
		case Term.NET_15:
			return 15;
		case Term.NET_30:
			return 30;
		case Term.NET_60:
			return 60;
		case Term.NET_90:
			return 90;
		default:
			return 15;
	}
}
/**
 * Generates invoices for ad impressions based on a specified date range.
 * NOTE: There will be only one line item per invoice. The line item description will be "Ad Impressions",
 * and will contain the total amount of ad impressions and the total amount of the invoice.
 * @returns {Promise<Object>} A promise that resolves to the created invoices.
 */
async function generateInvoices() {
	const adImpressionModel = new AdImpressionModel();
	const advertiserModel = new AdvertiserModel();
	const invoiceModel = new InvoiceModel();
	const currentMonth = new Date().getMonth();
	const from = new Date(new Date().getFullYear(), currentMonth - 1, 1);
	const to = new Date(new Date().getFullYear(), currentMonth, -1, 23, 59, 59);
	const adImpressions = await adImpressionModel.getByDateRange(from, to);
	const impressionsByAdvertisers = groupByKey(adImpressions, "advertiserId");
	const advertiserIds = Object.keys(impressionsByAdvertisers);
	const advertisers = await advertiserModel.getByIds(advertiserIds);
	const advertisersById = groupByKey(advertisers, "id");
	const invoices = [];
	for (const advertiserId in impressionsByAdvertisers) {
		const adImpressions = impressionsByAdvertisers[advertiserId];
		const adImpressionsAmount = adImpressions.reduce((acc, impression) => acc + impression.amount,0,)
		const invoice = {
			advertiserId: advertiserId,
			lineItems: {
				description: "Ad Impressions",
				amount: adImpressionsAmount,
				quantity: adImpressions.length,
			},
			amount: adImpressionsAmount,
			dueDate: new Date() + getDaysFromTerm(advertisersById),
		};
		invoices.push(invoice);
	}
	const createdInvoices = await invoiceModel.createMany(invoices);
	logger.info(`Succesfuly generated ${createdInvoices.count}`);
	return createdInvoices;
}

module.exports = generateInvoices;
