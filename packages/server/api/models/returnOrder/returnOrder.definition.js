export default {
	description: '',
	collection: 'returnOrder',
	roles: ['consultant', 'manager'],
	root: true, // Include in root query & mutation
	readonly: false, // Readonly model
	hidden: false, // Write only model
	query: null, // default query
	pagination: true,
	properties: {
		entryDate: {
			type: 'DateTime',
			default: new Date()
		},
		reason: 'String',
		returnAmount: 'Number',
		returnRevenue: 'Number',
		returnStatus: {
			enum: [
				{ value: 'requested' },
				{ value: 'accepted' },
				{ value: 'received' },
				{ value: 'completed' },
				{ value: 'cancelled' },
			]
		}
	}
}