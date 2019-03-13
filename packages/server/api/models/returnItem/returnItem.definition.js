export default {
	description: '',
	collection: 'returnItem',
	roles: ['consultant', 'manager'],
	root: true, // Include in root query & mutation
	readonly: false, // Readonly model
	hidden: false, // Write only model
	query: null, // default query
	pagination: true,
	properties: {
		returnOrder: 'ReturnOrder',
		product: 'Product',
		description: 'String',
		salesOrder: 'SalesOrder',
		salesOrderItem: 'SalesOrderItem',
		returnQuantity: 'Number',
		receivedQuantity: 'Number',
		returnPrice: 'Number',
		returnRevenue: 'Number',
	}
}