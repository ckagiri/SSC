export default {
  description: '',
  root: false, // Include in root query & mutation
  readOnly: false, // Readonly model
  hidden: false, // Write only model
  // serviceName: '',
  // collectionName: '',
  roles: [],
  properties: {
    category: [],
    position: '@Position',
    reason: 'String',
    fromDate: 'Date',
    toDate: 'Date',
    promotedBy: 'Contact',
    promotedAt: 'Date',
    approvedBy: 'Contact',
  },
};
