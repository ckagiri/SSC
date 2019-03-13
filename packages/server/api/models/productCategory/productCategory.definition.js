export default {
  description: 'product category',
  root: false, // Include in root query & mutation
  readOnly: false, // Readonly model
  hidden: false, // Write only model
  collection: 'productCategory',
  roles: [],
  realms: [],
  properties: {
    categoryCode: 'String!?',
    categoryName: 'String!?',
    description: 'String',
    longDescription: 'String',
    categoryImageUrl: 'String',
    isPhysical: 'Boolean',
    sortOrder: 'Number*',
    fromDate: 'Date',
    toDate: 'Date',
    products: {
      type: ['Product'],
      foreignKey: 'productCategoryId',
    },
  },
};
