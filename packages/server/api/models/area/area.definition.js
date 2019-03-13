export default {
  name: 'Area',
  description: 'Physical and virtual area for locations',
  root: true,
  readOnly: true,
  hidden: true,
  collection: 'area',
  includes: [],
  roles: [],
  sort: { sortOrder: 1 },
  properties: {
    name: 'String!',
    physical: {
      type: 'Boolean',
      default: true,
      required: true,
      search: true,
    }, // physical present or just virtual location
    sortOrder: {
      type: 'Int',
      required: true,
      sortable: true,
    },
    locations: {
      type: ['Location'],
      foreignKey: 'area',
    },
  },
  queries: {},
  methods: {},
};
