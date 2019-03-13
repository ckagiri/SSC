/**
 * @flow
 * @relayHash 08e09dbe832860003963322bbb31bb0f
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ContactSearch_viewer$ref = any;
export type ContactFilter = {|
  firstName?: ?string,
  lastName?: ?string,
  phone?: ?string,
  category?: ?any,
  position?: ?string,
  status?: ?any,
|};
export type ContactSearchPaginationQueryVariables = {|
  count: number,
  after?: ?string,
  filter?: ?ContactFilter,
  text?: ?string,
|};
export type ContactSearchPaginationQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: ContactSearch_viewer$ref
  |}
|};
export type ContactSearchPaginationQuery = {|
  variables: ContactSearchPaginationQueryVariables,
  response: ContactSearchPaginationQueryResponse,
|};
*/


/*
query ContactSearchPaginationQuery(
  $count: Int!
  $after: String
  $filter: ContactFilter
  $text: String
) {
  viewer: viewer {
    __typename
    ...ContactSearch_viewer_1R5hny
    id
  }
}

fragment ContactSearch_viewer_1R5hny on Staff {
  contacts(first: $count, after: $after, filter: $filter, text: $text) {
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
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "filter",
    "type": "ContactFilter",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "text",
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
v3 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after",
    "type": "String"
  },
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter",
    "type": "ContactFilter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count",
    "type": "Int"
  },
  {
    "kind": "Variable",
    "name": "text",
    "variableName": "text",
    "type": "String"
  }
],
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
    "name": "ContactSearchPaginationQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ContactSearch_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "after",
                "variableName": "after",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "filter",
                "variableName": "filter",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "text",
                "variableName": "text",
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
    "name": "ContactSearchPaginationQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": null,
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "Staff",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "contacts",
                "storageKey": null,
                "args": (v3/*: any*/),
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
                          (v2/*: any*/),
                          (v1/*: any*/),
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
                                  (v4/*: any*/),
                                  (v5/*: any*/),
                                  (v2/*: any*/)
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
                "args": (v3/*: any*/),
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
    "name": "ContactSearchPaginationQuery",
    "id": null,
    "text": "query ContactSearchPaginationQuery(\n  $count: Int!\n  $after: String\n  $filter: ContactFilter\n  $text: String\n) {\n  viewer: viewer {\n    __typename\n    ...ContactSearch_viewer_1R5hny\n    id\n  }\n}\n\nfragment ContactSearch_viewer_1R5hny on Staff {\n  contacts(first: $count, after: $after, filter: $filter, text: $text) {\n    totalCount\n    edges {\n      node {\n        category\n        fullName\n        phone\n        addresses {\n          city\n          town\n        }\n        ... on Staff {\n          shortName\n          position {\n            title\n            id\n          }\n        }\n        ... on Customer {\n          consultant {\n            __typename\n            shortName\n            position {\n              title\n              id\n            }\n            id\n          }\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '76245c2a7676d819ca6368d71f7e1045';
module.exports = node;
