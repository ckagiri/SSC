export default {
  description: 'Brand Information',
  root: false, // Include in root query & mutation
  readOnly: true, // Readonly model
  hidden: true, // Write only model
  collection: 'program',
  roles: ['consultant'],
  sort: { sortOrder: 1 },
  properties: {
    brand: '@Brand?',
    code: {
      type: 'String',
      get: ({ _id }) => _id,
    },
    name: 'String!',
    sortOrder: 'Int*',
  },
};
