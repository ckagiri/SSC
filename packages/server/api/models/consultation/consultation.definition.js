export default {
  description: 'Consutation session for a prduct user',
  root: false,
  roles: [],
  pagination: true,
  // collection: 'consultation',
  properties: {
    source: {
      description: 'Where do this assignment be initiated',
      type: 'Source'
    },
    condition: {
      description: 'Health condition',
      type: 'String'
    },
    request: 'String',
    assessement: 'String',
    advice: 'String',
    program: 'String',
    measurement: 'Measurement',
    consultant: 'Consultant',
    assignment: 'Assignment',
    action: []
  }
};
