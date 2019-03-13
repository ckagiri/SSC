export default {
  description: '',
  root: false, // Include in root query & mutation
  collection: '',
  roles: [],
  readonly: false, // Readonly model
  hidden: false, // Write only model
  scope: null, //object or function(data, params)
  query: null, // default query
  sort: null,
  pagination: false,
  validate: null,
  properties: {
    property: {
      // Authorization
      roles: [],
      validate: null,
      // required: !, search: ?, sort: *, default: =, unique: #, referred: @
      type: ['String'],
      required: false,
      sortable: false, // Include in OrderBy of GraphQL connection
      search: false, // Include in filter of GraphQL connection
      unique: false,
      referred: false, // value is referred to other collection, but do not link to it
      // enum type
      enum: [], // Enum type of String and receive values from same property of other entities
      enum: ['', ''], // Simple enum type
      enum: [
        // Full structure enum type
        {
          value: '',
          name: '',
          description: '',
        },
      ],
      enum: 'Type', // Reference to other table but not link to table

      // Relationship
      foreignKey: '', // Optional for belongsTo (add 'Id' to property name)
      linked: false, // link to other collection, auto generated

      // List property
      isList: false,
      scope: null, //object or function(data, params)
      sort: null,
      query: null, //
      paginated: false,
      // functions
      get: null, // get value of the property,
      set: null, // set value for property
    },
    queries: {
      name: ['type'],
      sort: null,
      query: null,
      pagination: false,
      find: null, // get value of the property,
    },
    includes: {
      name: ['type'],
      sort: null,
      query: null,
      pagination: false,
      find: null, // get value of the property,
    },
    methods: {
      method: {
        description: 'mutation',
        args: {
          arg: 'type',
        },
        return: 'type',
        fn: () => ({}), // Using method of the model with same name if omitted
        roles: [],
      },
    },
  },
  includes: ['Type'], // includes get field (type, typeBy) in the property
};
