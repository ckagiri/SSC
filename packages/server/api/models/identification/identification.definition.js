export default {
  description: '',
  root: false, // Include in root query & mutation
  properties: {
    idNo: 'String!',
    idType: {
      description: 'Type of: ID Card or Passport',
      default: 'ID',
      enum: [
        {
          value: 'ID',
          title: 'CMND',
          description: 'Chứng minh nhân dân',
        },
        {
          value: 'Passport',
          title: 'Hộ chiếu',
          description: 'Hộ chiếu',
        },
      ],
    },
    placeOfIssue: 'String',
    dateOfIssue: 'Date',
    dateOfExpired: 'Date',
  },
};
