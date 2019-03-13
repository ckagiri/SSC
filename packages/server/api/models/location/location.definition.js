export default {
  name: 'Location',
  description:
    'Location of contact (can be physical shop or just contact point',
  root: true,
  readOnly: false,
  hidden: true,
  collection: 'location',
  includes: [],
  roles: [],
  query: {
    $or: [{ closeDate: { $exists: false } }, { closeDate: { $gt: Date() } }],
  },
  sort: { sortOrder: 1 },
  properties: {
    name: 'String',
    code: 'String?',
    phone: 'String',
    address: 'Address',
    ext: 'String',
    shop: 'String', // shop number inside an address
    area: '@Area',
    physical: 'Boolean?', // physical present or just virtual location
    sortOrder: 'Int*',
    openDate: 'Date',
    closeDate: 'Date',
    openingTime: 'String',
    closingTime: 'String',
  },
  queries: {},
  methods: {},
};
