export default {
	description: 'Sales Order Line Item Model',
	collection: 'salesOrderItem',
	roles: ['consultant', 'manager'],
	root: true, // Include in root query & mutation
	readonly: false, // Readonly model
	hidden: false, // Write only model
	query: null, // default query
	pagination: true,
	properties: {
		salesOrder: 'SalesOrder',
		entryDate: 'DateTime',
		contact: 'Contact',
		location: '@Location',
		notes: 'String',
		product: 'Product!',
		itemDescription: 'String',
		quantity: 'Number!',
		cancelQuantity: 'Number',
		unitPrice: {
			type: 'Number!',
		},
		revenuePrice: {
			type: 'Number',
		},
		promotional: {
			type: 'Boolean',
		},
		discountable: {
			type: 'Boolean',
		},
		productPrice: 'ProductPrice',
		lineItemStatus: {
			enum: [
				{ value: 'draft', title: 'Báo giá' },
				{ value: 'approved', title: 'Đã xác nhận' },
				{ value: 'rejected', title: 'Từ chối' },
				{ value: 'done', title: 'Hoàn tất' },
				{ value: 'cancel', title: 'Hủy' }
			]
		},
		ReturnItems: ['ReturnItem']
	}
}