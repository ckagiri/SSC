export default {
  description: 'Assignments for consultant',
  root: false,
  includes: [],
  roles: ['consultant', 'manager'],
  pagination: true,
  collection: 'assignment',
  properties: {
    source: {
      description: 'Where do this assignment be initiated',
      type: 'Source',
    },
    request: 'String',
    result: 'String',
    priority: '*?Int',
    status: '*?Int',
    location: '@Location',
    contact: {
      description: 'Contact to work with for this assignment',
      type: 'Contact',
      foreignKey: 'contactId',
    },
    assignedTo: {
      description: 'Who need to perform this assignment',
      type: 'Contact',
      foreignKey: 'assignedToId',
    },
    assignedBy: {
      description: 'Person who make this assignment to',
      type: 'Contact',
      foreignKey: 'assignedById',
    },
    scheduledAt: 'DateTime',
    receivedAt: {
      description: 'when assignedTo received and read this assignment',
      type: 'DateTime',
      readOnly: true,
    },
    startedAt: {
      description: 'when assignedTo started to work on this assignment',
      type: 'DateTime',
      readOnly: true,
    },
    completedAt: {
      description: 'when assignedTo finished working on this assignment',
      type: 'DateTime',
      readOnly: true,
    },
    assignedAt: {
      description: 'when assignment is sent to assignTo',
      type: 'DateTime',
      readonly: true,
    },
    action: {
      description: 'Action to be taken',
      enum: [
        {
          value: 'call',
          title: 'Gọi điện',
        },
        {
          value: 'chat',
          title: 'Nhắn tin',
        },
        {
          value: 'meet',
          title: 'Gặp mặt',
        },
        {
          value: 'email',
          title: 'Email',
        },
        {
          value: 'visit',
          title: 'Tới nhà',
        },
      ],
    },
  },
};
