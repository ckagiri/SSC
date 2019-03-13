/**
 * @flow
 * @relayHash 351a410b55b7642b42a11dcd55ed65fc
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ContactSearch_viewer$ref = any;
export type ContactSearchQueryVariables = {||};
export type ContactSearchQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: ContactSearch_viewer$ref
  |}
|};
export type ContactSearchQuery = {|
  variables: ContactSearchQueryVariables,
  response: ContactSearchQueryResponse,
|};
*/


/*
query ContactSearchQuery {
  viewer {
    __typename
    ... on Staff {
      ...ContactSearch_viewer
    }
    id
  }
}

fragment ContactSearch_viewer on Staff {
  contacts(first: 10) {
    totalCount
    edges {
      node {
        category
        fullName
        phone
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
            shortName
            position {
              title
              id
            }
            id
          }
        }
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10,
    "type": "Int"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shortName",
  "args": null,
  "storageKey": null
},
v4 = {
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
    (v1/*: any*/)
  ]
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ContactSearchQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": [],
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
            "kind": "InlineFragment",
            "type": "Staff",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "ContactSearch_viewer",
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
    "name": "ContactSearchQuery",
    "argumentDefinitions": [],
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
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "Staff",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "contacts",
                "storageKey": "contacts(first:10)",
                "args": (v2/*: any*/),
                "concreteType": "ContactConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "totalCount",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ContactEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "category",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "fullName",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "phone",
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
                          (v1/*: any*/),
                          (v0/*: any*/),
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
                                  (v0/*: any*/),
                                  (v3/*: any*/),
                                  (v4/*: any*/),
                                  (v1/*: any*/)
                                ]
                              }
                            ]
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Staff",
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/)
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "cursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "pageInfo",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endCursor",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "hasNextPage",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": null,
                "name": "contacts",
                "args": (v2/*: any*/),
                "handle": "connection",
                "key": "ContactSearch_contacts",
                "filters": [
                  "text"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ContactSearchQuery",
    "id": null,
    "text": "query ContactSearchQuery {\n  viewer {\n    __typename\n    ... on Staff {\n      ...ContactSearch_viewer\n    }\n    id\n  }\n}\n\nfragment ContactSearch_viewer on Staff {\n  contacts(first: 10) {\n    totalCount\n    edges {\n      node {\n        category\n        fullName\n        phone\n        addresses {\n          city\n          town\n        }\n        ... on Staff {\n          shortName\n          position {\n            title\n            id\n          }\n        }\n        ... on Customer {\n          consultant {\n            __typename\n            shortName\n            position {\n              title\n              id\n            }\n            id\n          }\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'fe717cba50fa468ea39c814d43970b20';
module.exports = node;
