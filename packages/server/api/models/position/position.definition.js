export default {
  description: '',
  root: true, // Include in root query & mutation
  readOnly: false, // Readonly model
  hidden: true, // Write only model
  collection: 'position',
  roles: [],
  realms: [],
  properties: {
    code: {
      type: 'String',
      get: ({ _id }) => _id,
    },
    title: 'String!',
    discount: 'Number',
    category: {
      description:
        'Contact can be: Customer, Staff or Distributor',
      default: 'Customer',
      required: true,
      enum: [
        {
          value: 'Customer',
          title: 'Khách hàng',
        },
        {
          value: 'Staff',
          title: 'Nhân viên',
        },
        {
          value: 'Distributor',
          title: 'Nhà tư vấn',
        },
      ],
    },
  },
};
