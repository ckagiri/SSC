export default {
  description: 'Consultant',
  root: false,
  hidden: true,
  readOnly: false,
  collection: 'contact',
  roles: ['default:read'],
  scope: { category: 'Staff', position: 'Consultant' },
  // type:'Contact',
  properties: {
    shortName: 'String',
  },
};
