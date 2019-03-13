export default {
  root: false,
  collection: 'person',
  roles: ['consultant', 'manager'],
  properties: {
    prefix: {
      type: 'String',
      enum: [],
    },
    name: {
      type: 'String',
      required: true,
      sortable: false,
    },
    gender: {
      enum: [
        {
          value: 'F',
          title: 'Nữ',
        },
        {
          value: 'M',
          title: 'Nam',
        },
      ],
    },
    weight: 'Float',
    height: 'Int',
    age: 'Int',
    loss: 'Float',
    month: 'Int',

    startedAt: {
      description: 'Date of starting activities',
      type: 'Date',
    },
    consultations: ['Consultation'],
    // For Customer
    customer: {
      description: 'Contact of this person',
      type: 'Customer',
    },
  },
};
