/**
 * @flow
 * @relayHash 86bdb367e2550e5231d231037ceef46c
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ConsultantLayout_consultant$ref = any;
export type ConsultantRouteQueryVariables = {||};
export type ConsultantRouteQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: ConsultantLayout_consultant$ref
  |}
|};
export type ConsultantRouteQuery = {|
  variables: ConsultantRouteQueryVariables,
  response: ConsultantRouteQueryResponse,
|};
*/


/*
query ConsultantRouteQuery {
  viewer {
    __typename
    ...ConsultantLayout_consultant
    id
  }
}

fragment ConsultantLayout_consultant on Contact {
  ...ConsultantSidebar_consultant
}

fragment ConsultantSidebar_consultant on Contact {
  ...ConsultantHeader_consultant
  ... on Staff {
    inbox {
      totalCount
    }
    today {
      totalCount
    }
    call {
      totalCount
    }
    schedule {
      totalCount
    }
    favorite {
      totalCount
    }
    customers {
      totalCount
    }
    outbox {
      totalCount
    }
  }
}

fragment ConsultantHeader_consultant on Contact {
  shortName
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "totalCount",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ConsultantRouteQuery",
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
            "kind": "FragmentSpread",
            "name": "ConsultantLayout_consultant",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ConsultantRouteQuery",
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
            "kind": "ScalarField",
            "alias": null,
            "name": "__typename",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "shortName",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "type": "Staff",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "inbox",
                "storageKey": null,
                "args": null,
                "concreteType": "AssignmentConnection",
                "plural": false,
                "selections": (v0/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "today",
                "storageKey": null,
                "args": null,
                "concreteType": "AssignmentConnection",
                "plural": false,
                "selections": (v0/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "call",
                "storageKey": null,
                "args": null,
                "concreteType": "ContactConnection",
                "plural": false,
                "selections": (v0/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "schedule",
                "storageKey": null,
                "args": null,
                "concreteType": "AssignmentConnection",
                "plural": false,
                "selections": (v0/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "favorite",
                "storageKey": null,
                "args": null,
                "concreteType": "CustomerConnection",
                "plural": false,
                "selections": (v0/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "customers",
                "storageKey": null,
                "args": null,
                "concreteType": "CustomerConnection",
                "plural": false,
                "selections": (v0/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "outbox",
                "storageKey": null,
                "args": null,
                "concreteType": "AssignmentConnection",
                "plural": false,
                "selections": (v0/*: any*/)
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ConsultantRouteQuery",
    "id": null,
    "text": "query ConsultantRouteQuery {\n  viewer {\n    __typename\n    ...ConsultantLayout_consultant\n    id\n  }\n}\n\nfragment ConsultantLayout_consultant on Contact {\n  ...ConsultantSidebar_consultant\n}\n\nfragment ConsultantSidebar_consultant on Contact {\n  ...ConsultantHeader_consultant\n  ... on Staff {\n    inbox {\n      totalCount\n    }\n    today {\n      totalCount\n    }\n    call {\n      totalCount\n    }\n    schedule {\n      totalCount\n    }\n    favorite {\n      totalCount\n    }\n    customers {\n      totalCount\n    }\n    outbox {\n      totalCount\n    }\n  }\n}\n\nfragment ConsultantHeader_consultant on Contact {\n  shortName\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '82ba71ee849168e447c1a25315be33bf';
module.exports = node;
