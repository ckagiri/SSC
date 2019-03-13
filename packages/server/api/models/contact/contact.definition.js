// import R from 'ramda';
// import { log } from '../../bin/helpers';

export default {
  root: true,
  serviceName: 'contact',
  collection: 'contact',
  hidden: false,
  readOnly: true,
  pagination: true,
  roles: ['consultant', 'manager'],
  properties: {
    source: 'Source',
    prefix: ['Chị', 'Em', 'Anh', 'Cô', 'Chú', 'Bác', 'Bà', 'Ông'],
    firstName: 'String*?',
    lastName: 'String*!?',
    fullName: {
      type: 'String',
      get: ({ firstName, lastName }) =>
        `${firstName || ''}${firstName ? ' ' : ''}${lastName || ''}`,
    },
    shortName: 'String',
    phone: 'String#?',
    email: 'String#',
    category: {
      description: 'Contact can be: Customer, Staff or Distributor',
      default: 'Customer',
      required: true,
      search: true,
      readOnly: true,
      enum: [
        {
          value: 'Customer',
          label: 'Khách hàng',
        },
        {
          value: 'Staff',
          label: 'Nhân viên',
        },
        {
          value: 'Distributor',
          label: 'Nhà tư vấn',
        },
      ],
    },
    discount: 'Number',
    wallet: 'Number',
    bonus: 'Number',
    revenue: 'Number',
    groupRevenue: 'Number',
    position: {
      // current position
      type: 'Position',
      readOnly: true,
      search: true,
      foreignKey: 'position',
    },
    positions: {
      type: ['PositionLog'],
      readOnly: true,
      roles: ['manager'],
    }, // history
    startedAt: {
      description: 'Date of first activity such as buying products or joining date for distributor',
      type: 'Date',
    },
    birthday: 'Date',
    addresses: ['Address'],
    identification: ['Identification'],
    messages: ['Message'],
    status: {
      search: true,
      enum: [],
    },
    appointments: {
      type: ['Assignment'],
      foreignKey: 'contactId',
    },
    assignments: {
      type: ['Assignment'],
      foreignKey: 'assignedToId',
    },
  },
  includes: ['Contact'],
};
