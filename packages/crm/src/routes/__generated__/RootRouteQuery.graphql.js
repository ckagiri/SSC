/**
 * @flow
 * @relayHash a6b0b8fb78895d780f4b9d4f239b5fc4
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type CityFieldInput_cities$ref = any;
type ConsultantFieldInput_consultants$ref = any;
type ConsultantFieldInput_viewer$ref = any;
type ContactFieldInput_viewer$ref = any;
type LocationFieldInput_areas$ref = any;
type PrefixFieldInput_prefixes$ref = any;
type ProgramFieldInput_programs$ref = any;
type SourceFieldInput_touchpoints$ref = any;
export type RootRouteQueryVariables = {|
  phone?: ?string
|};
export type RootRouteQueryResponse = {|
  +authenticated: ?boolean,
  +viewer: ?{|
    +consultants?: ?$ReadOnlyArray<?{|
      +$fragmentRefs: ConsultantFieldInput_consultants$ref
    |}>,
    +$fragmentRefs: ConsultantFieldInput_viewer$ref & ContactFieldInput_viewer$ref,
  |},
  +lists: ?{|
    +prefixes: ?$ReadOnlyArray<?{|
      +$fragmentRefs: PrefixFieldInput_prefixes$ref
    |}>
  |},
  +programs: ?$ReadOnlyArray<?{|
    +$fragmentRefs: ProgramFieldInput_programs$ref
  |}>,
  +touchpoints: ?$ReadOnlyArray<?{|
    +$fragmentRefs: SourceFieldInput_touchpoints$ref
  |}>,
  +cities: ?$ReadOnlyArray<?{|
    +$fragmentRefs: CityFieldInput_cities$ref
  |}>,
  +areas: ?$ReadOnlyArray<?{|
    +$fragmentRefs: LocationFieldInput_areas$ref
  |}>,
|};
export type RootRouteQuery = {|
  variables: RootRouteQueryVariables,
  response: RootRouteQueryResponse,
|};
*/


/*
query RootRouteQuery(
  $phone: String
) {
  authenticated
  viewer {
    __typename
    ...ConsultantFieldInput_viewer_1F9ZJH
    ...ContactFieldInput_viewer_1F9ZJH
    ... on Staff {
      consultants {
        __typename
        ...ConsultantFieldInput_consultants
        id
      }
    }
    id
  }
  lists {
    prefixes {
      ...PrefixFieldInput_prefixes
    }
  }
  programs {
    ...ProgramFieldInput_programs
    id
  }
  touchpoints {
    ...SourceFieldInput_touchpoints
    id
  }
  cities {
    ...CityFieldInput_cities
    id
  }
  areas {
    ...LocationFieldInput_areas
    id
  }
}

fragment ConsultantFieldInput_viewer_1F9ZJH on Contact {
  contactBy(phone: $phone) {
    __typename
    category
    fullName
    id
  }
}

fragment ContactFieldInput_viewer_1F9ZJH on Contact {
  contactBy(phone: $phone) {
    __typename
    id
    category
    fullName
    phone
    discount
    addresses {
      city
      town
    }
    ... on Staff {
      shortName
      position {
        title
        id
      }
    }
    ... on Customer {
      consultant {
        __typename
        id
        fullName
        shortName
        position {
          title
          id
        }
      }
    }
  }
}

fragment ConsultantFieldInput_consultants on Contact {
  shortName
  fullName
  id
}

fragment PrefixFieldInput_prefixes on StringValues {
  value
  title
}

fragment ProgramFieldInput_programs on Program {
  brand
  code
  name
  id
}

fragment SourceFieldInput_touchpoints on Touchpoint {
  title
  fields
  list
  state
}

fragment CityFieldInput_cities on City {
  id
  name
  prefix
}

fragment LocationFieldInput_areas on Area {
  name
  locations {
    name
    code
    physical
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "phone",
    "type": "String",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "authenticated",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "phone",
    "variableName": "phone",
    "type": null
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fullName",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shortName",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "position",
  "storageKey": null,
  "args": null,
  "concreteType": "Position",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    (v5/*: any*/)
  ]
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "code",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "RootRouteQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v1/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ConsultantFieldInput_viewer",
            "args": (v2/*: any*/)
          },
          {
            "kind": "FragmentSpread",
            "name": "ContactFieldInput_viewer",
            "args": (v2/*: any*/)
          },
          {
            "kind": "InlineFragment",
            "type": "Staff",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "consultants",
                "storageKey": null,
                "args": null,
                "concreteType": null,
                "plural": true,
                "selections": [
                  {
                    "kind": "FragmentSpread",
                    "name": "ConsultantFieldInput_consultants",
                    "args": null
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "lists",
        "storageKey": null,
        "args": null,
        "concreteType": "Lists",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "prefixes",
            "storageKey": null,
            "args": null,
            "concreteType": "StringValues",
            "plural": true,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "PrefixFieldInput_prefixes",
                "args": null
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "programs",
        "storageKey": null,
        "args": null,
        "concreteType": "Program",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ProgramFieldInput_programs",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "touchpoints",
        "storageKey": null,
        "args": null,
        "concreteType": "Touchpoint",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "SourceFieldInput_touchpoints",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": null,
        "concreteType": "City",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "CityFieldInput_cities",
            "args": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "areas",
        "storageKey": null,
        "args": null,
        "concreteType": "Area",
        "plural": true,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "LocationFieldInput_areas",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "RootRouteQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      (v1/*: any*/),
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "contactBy",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "phone",
                "variableName": "phone",
                "type": "String"
              }
            ],
            "concreteType": null,
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "category",
                "args": null,
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "phone",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "discount",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "addresses",
                "storageKey": null,
                "args": null,
                "concreteType": "Address",
                "plural": true,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "city",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "town",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Customer",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "consultant",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v5/*: any*/),
                      (v4/*: any*/),
                      (v6/*: any*/),
                      (v8/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Staff",
                "selections": [
                  (v6/*: any*/),
                  (v8/*: any*/)
                ]
              }
            ]
          },
          (v5/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "Staff",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "consultants",
                "storageKey": null,
                "args": null,
                "concreteType": null,
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  (v6/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
                ]
              }
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "lists",
        "storageKey": null,
        "args": null,
        "concreteType": "Lists",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "prefixes",
            "storageKey": null,
            "args": null,
            "concreteType": "StringValues",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "value",
                "args": null,
                "storageKey": null
              },
              (v7/*: any*/)
            ]
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "programs",
        "storageKey": null,
        "args": null,
        "concreteType": "Program",
        "plural": true,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "brand",
            "args": null,
            "storageKey": null
          },
          (v9/*: any*/),
          (v10/*: any*/),
          (v5/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "touchpoints",
        "storageKey": null,
        "args": null,
        "concreteType": "Touchpoint",
        "plural": true,
        "selections": [
          (v7/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "fields",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "list",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "state",
            "args": null,
            "storageKey": null
          },
          (v5/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": null,
        "concreteType": "City",
        "plural": true,
        "selections": [
          (v5/*: any*/),
          (v10/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "prefix",
            "args": null,
            "storageKey": null
          }
        ]
      },
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "areas",
        "storageKey": null,
        "args": null,
        "concreteType": "Area",
        "plural": true,
        "selections": [
          (v10/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "locations",
            "storageKey": null,
            "args": null,
            "concreteType": "Location",
            "plural": true,
            "selections": [
              (v10/*: any*/),
              (v9/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "physical",
                "args": null,
                "storageKey": null
              },
              (v5/*: any*/)
            ]
          },
          (v5/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "RootRouteQuery",
    "id": null,
    "text": "query RootRouteQuery(\n  $phone: String\n) {\n  authenticated\n  viewer {\n    __typename\n    ...ConsultantFieldInput_viewer_1F9ZJH\n    ...ContactFieldInput_viewer_1F9ZJH\n    ... on Staff {\n      consultants {\n        __typename\n        ...ConsultantFieldInput_consultants\n        id\n      }\n    }\n    id\n  }\n  lists {\n    prefixes {\n      ...PrefixFieldInput_prefixes\n    }\n  }\n  programs {\n    ...ProgramFieldInput_programs\n    id\n  }\n  touchpoints {\n    ...SourceFieldInput_touchpoints\n    id\n  }\n  cities {\n    ...CityFieldInput_cities\n    id\n  }\n  areas {\n    ...LocationFieldInput_areas\n    id\n  }\n}\n\nfragment ConsultantFieldInput_viewer_1F9ZJH on Contact {\n  contactBy(phone: $phone) {\n    __typename\n    category\n    fullName\n    id\n  }\n}\n\nfragment ContactFieldInput_viewer_1F9ZJH on Contact {\n  contactBy(phone: $phone) {\n    __typename\n    id\n    category\n    fullName\n    phone\n    discount\n    addresses {\n      city\n      town\n    }\n    ... on Staff {\n      shortName\n      position {\n        title\n        id\n      }\n    }\n    ... on Customer {\n      consultant {\n        __typename\n        id\n        fullName\n        shortName\n        position {\n          title\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ConsultantFieldInput_consultants on Contact {\n  shortName\n  fullName\n  id\n}\n\nfragment PrefixFieldInput_prefixes on StringValues {\n  value\n  title\n}\n\nfragment ProgramFieldInput_programs on Program {\n  brand\n  code\n  name\n  id\n}\n\nfragment SourceFieldInput_touchpoints on Touchpoint {\n  title\n  fields\n  list\n  state\n}\n\nfragment CityFieldInput_cities on City {\n  id\n  name\n  prefix\n}\n\nfragment LocationFieldInput_areas on Area {\n  name\n  locations {\n    name\n    code\n    physical\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '099f80ba5d572a0a36f1deb69951a0e9';
module.exports = node;
