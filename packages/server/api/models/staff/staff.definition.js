import moment from 'moment';

export default {
  root: true,
  type: 'Contact',
  hidden: false,
  description: '',
  pagination: false,
  collection: 'contact',
  roles: ['staff'],
  scope: { category: 'Staff' },
  sort: { area: 1, status: -1 },
  // includes:['Customer', 'Distributor'],
  properties: {
    locations: ['String'],
    area: {
      type: '@Area',
    },
    status: {
      search: true,
      prefix: 'S',
      enum: [
        {
          value: 0,
          title: 'Nghỉ việc',
        },
        {
          value: 10,
          title: 'Tập sự',
        },
        {
          value: 20,
          title: 'Chính thức',
        },
        {
          value: 30,
          title: 'Kinh nghiệm',
        },
        {
          value: 40,
          title: 'Trưởng nhóm',
        },
        {
          value: 50,
          title: 'Quản lý',
        },
      ],
    },
    manager: {
      description: 'Người quản lý trực tiếp',
      type: 'Staff',
    },
    inbox: {
      description: 'Assignment that are not scheduled yet',
      filterBy: {
        scheduledAt: { $exits: false },
        completedAt: { $exits: false },
      },
      sort: { scheduledAt: -1 },
      type: ['Assignment'],
      foreignKey: 'assignedToId',
    },
    today: {
      description: 'Assignment that are scheduled at today or overdue',
      query: {
        scheduledAt: {
          $lte: moment()
            .endOf('day')
            .toDate(),
        },
      },
      sort: { scheduledAt: 1 },
      type: ['Assignment'],
      foreignKey: 'assignedToId',
    },
    call: {
      description: 'Contact need to call to make an appointment or consultation',
      type: ['Contact'],
      foreignKey: 'assignedToId',
    },
    schedule: {
      description: 'Assignment that are scheduled from tomorrow onward',
      query: {
        scheduledAt: {
          $gt: moment()
            .endOf('day')
            .toDate(),
        },
      },
      type: ['Assignment'],
      sort: { scheduledAt: 1 },
      foreignKey: 'assignedToId',
    },
    outbox: {
      description: 'Assignment assigned by this consultant but not received yet',
      type: ['Assignment'],
      foreignKey: 'updatedById',
    },
    favorite: {
      description: 'Customer with status = favorite',
      type: ['Customer'],
      foreignKey: 'assignedToId',
      pagination: true,
    },
    customers: {
      description: 'Customers who are taken care by',
      type: ['Customer'],
      args: {
        from: {
          type: 'Date',
          // default: moment().startOf('month').toDate(),
        },
        to: 'Date',
      },
      pagination: true,
      foreignKey: 'consultantId',
    },
  },
  queries: {
    consultants: {
      description: 'Consultants',
      query: { position: 'Consultant' },
      sort: { category: -1 },
      type: ['Contact'],
      pagination: false,
    },
    distributors: {
      description: 'Distributors',
      query: { category: 'Distributor' },

      type: ['Distributor'],
      pagination: true,
    },
    contacts: {
      description: 'All contacts',
      type: ['Contact'],
      pagination: true,
    },
  },
  includes: ['consultant'],
};
