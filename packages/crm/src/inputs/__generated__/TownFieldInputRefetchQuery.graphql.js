/**
 * @flow
 * @relayHash 2dcdb0d6645c98bb44789410f126eb01
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type TownFieldInput_towns$ref = any;
export type CityFilter = {|
  name?: ?string
|};
export type TownFieldInputRefetchQueryVariables = {|
  filter?: ?CityFilter
|};
export type TownFieldInputRefetchQueryResponse = {|
  +cities: ?$ReadOnlyArray<?{|
    +towns: ?$ReadOnlyArray<?{|
      +$fragmentRefs: TownFieldInput_towns$ref
    |}>
  |}>
|};
export type TownFieldInputRefetchQuery = {|
  variables: TownFieldInputRefetchQueryVariables,
  response: TownFieldInputRefetchQueryResponse,
|};
*/


/*
query TownFieldInputRefetchQuery(
  $filter: CityFilter
) {
  cities(filter: $filter) {
    towns {
      ...TownFieldInput_towns
      id
    }
    id
  }
}

fragment TownFieldInput_towns on Town {
  name
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "filter",
    "type": "CityFilter",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "filter",
    "variableName": "filter",
    "type": "CityFilter"
  }
],
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
    "name": "TownFieldInputRefetchQuery",
    "type": "RootQuery",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "City",
        "plural": true,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "towns",
            "storageKey": null,
            "args": null,
            "concreteType": "Town",
            "plural": true,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "TownFieldInput_towns",
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
    "name": "TownFieldInputRefetchQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "cities",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "City",
        "plural": true,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "towns",
            "storageKey": null,
            "args": null,
            "concreteType": "Town",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "name",
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
    "name": "TownFieldInputRefetchQuery",
    "id": null,
    "text": "query TownFieldInputRefetchQuery(\n  $filter: CityFilter\n) {\n  cities(filter: $filter) {\n    towns {\n      ...TownFieldInput_towns\n      id\n    }\n    id\n  }\n}\n\nfragment TownFieldInput_towns on Town {\n  name\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '331620f5a37b2ad8260bc9b1f18ea5de';
module.exports = node;
