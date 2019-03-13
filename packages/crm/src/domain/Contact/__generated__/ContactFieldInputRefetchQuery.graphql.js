/**
 * @flow
 * @relayHash 32cde9293fd0866ef951552df2eef650
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ContactFieldInput_viewer$ref = any;
export type ContactFieldInputRefetchQueryVariables = {|
  phone?: ?string
|};
export type ContactFieldInputRefetchQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: ContactFieldInput_viewer$ref
  |}
|};
export type ContactFieldInputRefetchQuery = {|
  variables: ContactFieldInputRefetchQueryVariables,
  response: ContactFieldInputRefetchQueryResponse,
|};
*/


/*
query ContactFieldInputRefetchQuery(
  $phone: String
) {
  viewer {
    __typename
    ...ContactFieldInput_viewer_1F9ZJH
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
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
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
  "name": "shortName",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "position",
  "storageKey": null,
  "args": null,
  "concreteType": "Position",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    (v2/*: any*/)
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ContactFieldInputRefetchQuery",
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
            "kind": "FragmentSpread",
            "name": "ContactFieldInput_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "phone",
                "variableName": "phone",
                "type": null
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ContactFieldInputRefetchQuery",
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
          (v1/*: any*/),
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
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "category",
                "args": null,
                "storageKey": null
              },
              (v3/*: any*/),
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
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Staff",
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/)
                ]
              }
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ContactFieldInputRefetchQuery",
    "id": null,
    "text": "query ContactFieldInputRefetchQuery(\n  $phone: String\n) {\n  viewer {\n    __typename\n    ...ContactFieldInput_viewer_1F9ZJH\n    id\n  }\n}\n\nfragment ContactFieldInput_viewer_1F9ZJH on Contact {\n  contactBy(phone: $phone) {\n    __typename\n    id\n    category\n    fullName\n    phone\n    discount\n    addresses {\n      city\n      town\n    }\n    ... on Staff {\n      shortName\n      position {\n        title\n        id\n      }\n    }\n    ... on Customer {\n      consultant {\n        __typename\n        id\n        fullName\n        shortName\n        position {\n          title\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0d0886813880524483a44055cbc31e1b';
module.exports = node;
