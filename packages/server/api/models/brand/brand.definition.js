export default {
  description: 'Brand Information',
  root: false, // Include in root query & mutation
  readOnly: true, // Readonly model
  hidden: true, // Write only model
  collection: 'brand',
  roles: [],
  sort: { sortOrder: 1 },
  properties: {
    name: 'String!',
    title: 'String',
    sortOrder: 'Int*',
    programs:{
      type: ['Program'],
      foreignKey:'brand'
    }
  },
};