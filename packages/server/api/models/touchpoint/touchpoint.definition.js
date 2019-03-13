export default {
  description: '',
  root: true, // Include in root query & mutation
  readOnly: true, // Readonly model
  hidden: true, // Write only model
  collection: 'touchpoint',
  roles: [],
  sort: { sortOrder: 1 },
  properties: {
    title: 'String!',
    fields: {
      description: 'Fields for source information',
      type: ['String'],
      enum: ['link', 'page', 'introducedBy', 'location', 'utm'],
    },
    list: ['String'],
    // state for new contact with this touchpoint
    state: ['preconsultation', 'consultation'],
    sortOrder: 'Int*',
  },
};
