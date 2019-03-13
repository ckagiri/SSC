// import moment from 'moment';

export default {
  root: true,
  hidden: true,
  type: 'Contact',
  scope: { category: 'Distributor' },
  // roles: ['staff', 'manager', 'consultant'],
  sort: { area: 1, status: -1 },
  defaultFilter: null,
  description: '',
  collection: 'contact',
  properties: {
    area: '@Area',
    status: {
      prefix: 'D',
      search: true,
      enum: [
        {
          value: 0,
          title: 'Chấm dứt hợp đồng',
        },
        {
          value: 1,
          title: 'Tạm dừng',
        },
        {
          value: 2,
          title: 'Quá hạn',
        },
        {
          value: 3,
          title: 'Chờ nộp tiền thế chấp',
        },
        {
          value: 10,
          title: 'Không gia hạn hợp đồng',
        },
        {
          value: 20,
          title: 'Nhà tư vấn',
        },
        {
          value: 30,
          title: 'Đại lý lớn',
        },
        {
          value: 40,
          title: 'Phân khách',
        },
      ],
    },
    // customers: {
    //   description: 'Customers of distributor who buy directly from company',
    //   type: ['Customer'],
    //   args: {
    //     from: 'Date',
    //     to: 'Date',
    //   },
    //   pagination: true,
    //   foreignKey: 'distributorId',
    // },
  },
  queries: {},
  methods: {},
};
