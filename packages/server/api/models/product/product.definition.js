export default {
  description: 'product entity',
  root: false, // Include in root query & mutation
  readOnly: false, // Readonly model
  hidden: false, // Write only model
  collection: 'product',
  scope: { available: true },
  sort: { productCode: 1 },
  roles: [],
  properties: {
    productCategory: {
      type: 'ProductCategory',
      foreignKey: 'productCategoryId',
      required: true
    },
    productCode: 'String!?',
    productName: 'String!?',
    internalName: 'String!?',
    simpleName: 'String!?',
    brandName: 'String',
    comments: 'String',
    description: 'String',
    longDescription: 'String',
    productImageUrl: 'String',
    unitOfMeasure: {
      enum: [
        { value: 'Hộp', title: 'Hộp' },
        { value: 'Chai', title: 'Chai' },
        { value: 'Túi', title: 'Cái' },
        { value: 'Bình', title: 'Bình' },
        { value: 'Phiếu', title: 'Phiếu' },
        { value: 'Gói', title: 'Gói' }
      ]
    },
    fromDate: 'Date',
    toDate: 'Date',
    available: 'Boolean',
    sortOrder: 'Number*'
  }
};
