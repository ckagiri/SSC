export default {
	description: 'Price List',
	collection: 'productPrice',
	roles: ['consultant', 'manager'],
	root: true, // Include in root query & mutation
	readonly: false, // Readonly model
	hidden: false, // Write only model
	query: null, // default query
	pagination: true,
	properties: {
		contactCategory: 'String?',
		description: 'String',
		fromDate: 'Date',
		toDate: 'Date',
		priceWithoutTax: 'Number',
		priceWithTax: 'Number',
		taxPercentage: {
			type: 'Number',
			default: 10,
		},
		taxAmount: 'Number',
		revenuePrice: 'Number',
		promotional: {
			type: 'Boolean',
			default: false,
		},
		discountable: {
			type: 'Boolean',
			default: true,
		},
		sortOrder: {
			type: 'Number',
			default: 1
		},
	},
}