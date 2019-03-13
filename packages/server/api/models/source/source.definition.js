export default {
  description: '',
  root: false, // Include in root query & mutation
  readOnly: false, // Readonly model
  hidden: false, // Write only model
  // serviceName: 'contactSource',
  // collectionName: 'contactSource',
  roles: [],
  realms: [],
  properties: {
    from: 'String!',
    page: 'String',
    link: 'String',
    location: 'Location',
    utm_source: 'String',
    utm_name: 'String',
    utm_medium: 'String',
    utm_term: 'String',
    utm_content: 'String',
  },
};
