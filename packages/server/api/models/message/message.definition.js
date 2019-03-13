export default {
  description: '',
  root: false, // Include in root query & mutation
  readOnly: false, // Readonly model
  hidden: false, // Write only model
  // serviceName: 'noteData',
  // collectionName: 'noteData',
  roles: [],
  realms: [],
  properties: {
    user: 'User',
    text: 'String',
    done: 'Boolean',
    expiredAt: 'DateTime',
    publishedAt: 'DateTime',
    replyTo: 'Message',
  },
};
