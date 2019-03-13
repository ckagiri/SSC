/**
 * @flow
 * @relayHash 2e1f99974a5604bbae9576b14439904d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ConsultantFieldInput_viewer$ref = any;
export type ConsultantFieldInputRefetchQueryVariables = {|
  phone?: ?string
|};
export type ConsultantFieldInputRefetchQueryResponse = {|
  +viewer: ?{|
    +$fragmentRefs: ConsultantFieldInput_viewer$ref
  |}
|};
export type ConsultantFieldInputRefetchQuery = {|
  variables: ConsultantFieldInputRefetchQueryVariables,
  response: ConsultantFieldInputRefetchQueryResponse,
|};
*/


/*
query ConsultantFieldInputRefetchQuery(
  $phone: String
) {
  viewer {
    __typename
    ...ConsultantFieldInput_viewer_1F9ZJH
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
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ConsultantFieldInputRefetchQuery",
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
            "name": "ConsultantFieldInput_viewer",
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
    "name": "ConsultantFieldInputRefetchQuery",
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
              (v2/*: any*/)
            ]
          },
          (v2/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ConsultantFieldInputRefetchQuery",
    "id": null,
    "text": "query ConsultantFieldInputRefetchQuery(\n  $phone: String\n) {\n  viewer {\n    __typename\n    ...ConsultantFieldInput_viewer_1F9ZJH\n    id\n  }\n}\n\nfragment ConsultantFieldInput_viewer_1F9ZJH on Contact {\n  contactBy(phone: $phone) {\n    __typename\n    category\n    fullName\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '10286b0a5625824b66980c8ba066b1ff';
module.exports = node;
