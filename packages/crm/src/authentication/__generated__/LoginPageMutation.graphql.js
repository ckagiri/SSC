/**
 * @flow
 * @relayHash 8cd9bb19b31d3225eae89079df8a8947
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type LoginUserInput = {|
  credential: string,
  password: string,
  location?: ?string,
  clientMutationId?: ?string,
|};
export type LoginPageMutationVariables = {|
  input: LoginUserInput
|};
export type LoginPageMutationResponse = {|
  +userMutation: ?{|
    +login: ?{|
      +accessToken: ?string,
      +user: ?{|
        +__typename: string,
        +id: string,
        +location: ?any,
        +firstName: ?string,
        +lastName: ?string,
      |},
    |}
  |}
|};
export type LoginPageMutation = {|
  variables: LoginPageMutationVariables,
  response: LoginPageMutationResponse,
|};
*/


/*
mutation LoginPageMutation(
  $input: LoginUserInput!
) {
  userMutation {
    login(input: $input) {
      accessToken
      user {
        __typename
        id
        location
        firstName
        lastName
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "LoginUserInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "userMutation",
    "storageKey": null,
    "args": null,
    "concreteType": "UserMutations",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "login",
        "storageKey": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "LoginUserInput!"
          }
        ],
        "concreteType": "LoginUserPayload",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "accessToken",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "user",
            "storageKey": null,
            "args": null,
            "concreteType": "User",
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
                "name": "id",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "location",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "firstName",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "lastName",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "LoginPageMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "LoginPageMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "LoginPageMutation",
    "id": null,
    "text": "mutation LoginPageMutation(\n  $input: LoginUserInput!\n) {\n  userMutation {\n    login(input: $input) {\n      accessToken\n      user {\n        __typename\n        id\n        location\n        firstName\n        lastName\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '47045bdb0365e377475dde25a1c8d34d';
module.exports = node;
