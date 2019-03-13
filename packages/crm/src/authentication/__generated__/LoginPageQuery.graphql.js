/**
 * @flow
 * @relayHash 49f369f18d86a5af3b6394ea6a090b9d
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type LocationFieldInput_areas$ref = any;
export type LoginPageQueryVariables = {||};
export type LoginPageQueryResponse = {|
  +areas: ?$ReadOnlyArray<?{|
    +$fragmentRefs: LocationFieldInput_areas$ref
  |}>
|};
export type LoginPageQuery = {|
  variables: LoginPageQueryVariables,
  response: LoginPageQueryResponse,
|};
*/


/*
query LoginPageQuery {
  areas {
    ...LocationFieldInput_areas
    id
  }
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
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v1 = {
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
    "name": "LoginPageQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
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
    "name": "LoginPageQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "areas",
        "storageKey": null,
        "args": null,
        "concreteType": "Area",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "locations",
            "storageKey": null,
            "args": null,
            "concreteType": "Location",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "code",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "physical",
                "args": null,
                "storageKey": null
              },
              (v1/*: any*/)
            ]
          },
          (v1/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "LoginPageQuery",
    "id": null,
    "text": "query LoginPageQuery {\n  areas {\n    ...LocationFieldInput_areas\n    id\n  }\n}\n\nfragment LocationFieldInput_areas on Area {\n  name\n  locations {\n    name\n    code\n    physical\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '78045cd8f67d5369db2b03c76d36831b';
module.exports = node;
