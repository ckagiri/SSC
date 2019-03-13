export default {
  root: true,
  hidden: true,
  collection: 'contact',
  type: 'Contact',
  readOnly: true,
  pagination: true,
  roles: ['default'],
  scope: { category: 'Customer' },
  properties: {
    anonymous: 'Boolean',
    status: {
      roles: ['manager'],
      search: true,
      // prefix: 'C',
      enum: [
        { value: 'active' },
        {
          value: 1,
          title: 'Bình thường',
        },
        {
          value: 20,
          title: 'Yêu thích',
        },
        {
          value: 21,
          title: 'KQ không tốt',
        },
      ],
    },
    state: {
      enum: [
        {
          value: 'preconsultation',
          title: 'Sơ bộ',
        },
        {
          value: 'consultation',
          title: 'Tư vấn',
        },
        { value: 'care', title: 'Chăm sóc' },
      ],
    },
    persons: ['Person'],

    teleconsultant: {
      description: 'Chuyên viên Tư vấn sơ bộ',
      type: 'Contact',
    },
    preconsultant: {
      description: 'Chuyên viên Tư vấn',
      type: 'Contact',
    },
    consultant: {
      description: 'Chuyên viên Chăm sóc',
      foreignKey: 'consultantId',
      type: 'Contact',
    },

    introducedBy: {
      description: 'The contact who refer to this customer',
      type: 'Contact',
    },
    introduceTo: {
      description: 'Customers which are introduced by this customer',
      type: ['Customer'],
      foreignKey: 'introducedById',
    },
  },
};
