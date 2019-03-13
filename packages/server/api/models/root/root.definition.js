export default {
  description: 'Root',
  root: true,
  hidden: true,
  readOnly: true,
  roles: ['default:read'],
  // type:'Contact',
  properties: {
    authenticated: 'boolean',
    viewer: {
      type: 'Contact',
      foreignKey: '_id',
    },
    location: {
      type: 'Location',
      readOnly: true,
    },
  },
  queries: {
    areas: ['Area'],
    brands: ['Brand'],
    programs: ['Program'],
    cities: ['City'],
    touchpoints: ['Touchpoint'],
    locations: ['Location'],
    products: ['Product'],
  },
};
