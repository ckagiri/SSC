/**
 * @flow
 * @relayHash 360bad3bab1bdfc2e22e031ce6cddd1d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ContactPage_contact$ref = any;
export type ContactRouteQueryVariables = {|
  phone?: ?string
|};
export type ContactRouteQueryResponse = {|
  +viewer: ?{|
    +contactBy: ?{|
      +$fragmentRefs: ContactPage_contact$ref
    |}
  |}
|};
export type ContactRouteQuery = {|
  variables: ContactRouteQueryVariables,
  response: ContactRouteQueryResponse,
|};
*/


/*
query ContactRouteQuery(
  $phone: String
) {
  viewer {
    __typename
    contactBy(phone: $phone) {
      __typename
      ...ContactPage_contact
      id
    }
    id
  }
}

fragment ContactPage_contact on Contact {
  fullName
  category
  ...ContactTopbar_contact
  ... on Customer {
    ...CustomerPage_customer
  }
}

fragment ContactTopbar_contact on Contact {
  fullName
  phone
}

fragment CustomerPage_customer on Customer {
  phone
  state
  ...CustomerView_customer
  ...Consultation_customer
}

fragment CustomerView_customer on Contact {
  phone
  ...CustomerHeader_customer
  ... on Customer {
    introducedBy {
      __typename
      fullName
      phone
      id
    }
    teleconsultant {
      __typename
      shortName
      id
    }
    preconsultant {
      __typename
      shortName
      id
    }
    consultant {
      __typename
      shortName
      id
    }
  }
}

fragment Consultation_customer on Customer {
  state
  ...Preconsultation_customer
}

fragment Preconsultation_customer on Customer {
  id
  persons {
    name
    id
  }
}

fragment CustomerHeader_customer on Contact {
  fullName
  phone
  discount
  wallet
  revenue
  groupRevenue
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
v1 = [
  {
    "kind": "Variable",
    "name": "phone",
    "variableName": "phone",
    "type": "String"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fullName",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
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
v6 = [
  (v2/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "shortName",
    "args": null,
    "storageKey": null
  },
  (v5/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ContactRouteQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
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
            "kind": "LinkedField",
            "alias": null,
            "name": "contactBy",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": null,
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "ContactPage_contact",
                "args": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ContactRouteQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "contactBy",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": null,
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
                "kind": "InlineFragment",
                "type": "Customer",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "groupRevenue",
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
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "wallet",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "revenue",
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
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "introducedBy",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "teleconsultant",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": (v6/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "preconsultant",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": (v6/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "consultant",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": (v6/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "persons",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Person",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "name",
                        "args": null,
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v5/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ContactRouteQuery",
    "id": null,
    "text": "query ContactRouteQuery(\n  $phone: String\n) {\n  viewer {\n    __typename\n    contactBy(phone: $phone) {\n      __typename\n      ...ContactPage_contact\n      id\n    }\n    id\n  }\n}\n\nfragment ContactPage_contact on Contact {\n  fullName\n  category\n  ...ContactTopbar_contact\n  ... on Customer {\n    ...CustomerPage_customer\n  }\n}\n\nfragment ContactTopbar_contact on Contact {\n  fullName\n  phone\n}\n\nfragment CustomerPage_customer on Customer {\n  phone\n  state\n  ...CustomerView_customer\n  ...Consultation_customer\n}\n\nfragment CustomerView_customer on Contact {\n  phone\n  ...CustomerHeader_customer\n  ... on Customer {\n    introducedBy {\n      __typename\n      fullName\n      phone\n      id\n    }\n    teleconsultant {\n      __typename\n      shortName\n      id\n    }\n    preconsultant {\n      __typename\n      shortName\n      id\n    }\n    consultant {\n      __typename\n      shortName\n      id\n    }\n  }\n}\n\nfragment Consultation_customer on Customer {\n  state\n  ...Preconsultation_customer\n}\n\nfragment Preconsultation_customer on Customer {\n  id\n  persons {\n    name\n    id\n  }\n}\n\nfragment CustomerHeader_customer on Contact {\n  fullName\n  phone\n  discount\n  wallet\n  revenue\n  groupRevenue\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ca2dcba284fdfd4f0084453b64ef6d8b';
module.exports = node;
