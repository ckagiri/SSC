export default {
  name: 'User',
  root: true,
  readOnly: true,
  hidden: true,
  // type: 'Contact',
  scope: { password: { $exists: true } },
  collection: 'contact',
  roles: ['default'],
  properties: {
    username: 'String#',
    lastName: 'String',
    firstName: 'String',
    fullName: {
      type: 'String',
      get: ({ firstName, lastName }) =>
        `${firstName || ''}${
          firstName ? ' ' : ''
        }${lastName || ''}`,
    },
    phone: 'String#?',
    email: 'String#',
    category: {
      enum: [],
    },
    position: {
      // current position
      type: 'Position',
      readOnly: true,
      search: true,
      foreignKey: 'position',
    },
    password: {
      type: 'String',
      hidden: true,
    },
    locations: ['Location'],
    location: {
      type: '@Location',
      readOnly: true,
    },
  },
};
