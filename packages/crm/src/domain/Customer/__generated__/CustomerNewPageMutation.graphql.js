/**
 * @flow
 * @relayHash d59f643153b60bf01d7fc34327b90953
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RegisterCustomerInput = {|
  customer: CustomerInput,
  clientMutationId?: ?string,
|};
export type CustomerInput = {|
  source?: ?SourceInput,
  prefix?: ?any,
  firstName?: ?string,
  lastName: string,
  shortName?: ?string,
  phone?: ?string,
  email?: ?string,
  discount?: ?number,
  wallet?: ?number,
  bonus?: ?number,
  revenue?: ?number,
  groupRevenue?: ?number,
  position?: ?string,
  startedAt?: ?any,
  birthday?: ?any,
  addresses?: ?$ReadOnlyArray<?AddressInput>,
  identification?: ?$ReadOnlyArray<?IdentificationInput>,
  messages?: ?$ReadOnlyArray<?MessageInput>,
  status?: ?any,
  anonymous?: ?boolean,
  state?: ?any,
  teleconsultantId?: ?string,
  preconsultantId?: ?string,
  consultantId?: ?string,
  introducedById?: ?string,
  createdById?: ?string,
  updatedById?: ?string,
  deletedById?: ?string,
|};
export type SourceInput = {|
  from: string,
  page?: ?string,
  link?: ?string,
  locationId?: ?string,
  utm_source?: ?string,
  utm_name?: ?string,
  utm_medium?: ?string,
  utm_term?: ?string,
  utm_content?: ?string,
|};
export type AddressInput = {|
  addressType?: ?any,
  name?: ?string,
  company?: ?string,
  phone?: ?string,
  taxID?: ?string,
  street1?: ?string,
  street2?: ?string,
  town?: ?string,
  city?: ?string,
|};
export type IdentificationInput = {|
  idNo: string,
  idType?: ?any,
  placeOfIssue?: ?string,
  dateOfIssue?: ?any,
  dateOfExpired?: ?any,
|};
export type MessageInput = {|
  userId?: ?string,
  text?: ?string,
  done?: ?boolean,
  expiredAt?: ?any,
  publishedAt?: ?any,
  replyTo?: ?MessageInput,
|};
export type CustomerNewPageMutationVariables = {|
  input: RegisterCustomerInput
|};
export type CustomerNewPageMutationResponse = {|
  +customerMutation: ?{|
    +register: ?{|
      +customer: ?{|
        +phone: ?string,
        +category: any,
        +state: ?any,
      |}
    |}
  |}
|};
export type CustomerNewPageMutation = {|
  variables: CustomerNewPageMutationVariables,
  response: CustomerNewPageMutationResponse,
|};
*/


/*
mutation CustomerNewPageMutation(
  $input: RegisterCustomerInput!
) {
  customerMutation {
    register(input: $input) {
      customer {
        phone
        category
        state
        id
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
    "type": "RegisterCustomerInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input",
    "type": "RegisterCustomerInput!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "category",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CustomerNewPageMutation",
    "type": "RootMutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "customerMutation",
        "storageKey": null,
        "args": null,
        "concreteType": "CustomerMutations",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "register",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "RegisterCustomerPayload",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "customer",
                "storageKey": null,
                "args": null,
                "concreteType": "Customer",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CustomerNewPageMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "customerMutation",
        "storageKey": null,
        "args": null,
        "concreteType": "CustomerMutations",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "register",
            "storageKey": null,
            "args": (v1/*: any*/),
            "concreteType": "RegisterCustomerPayload",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "customer",
                "storageKey": null,
                "args": null,
                "concreteType": "Customer",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "id",
                    "args": null,
                    "storageKey": null
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "mutation",
    "name": "CustomerNewPageMutation",
    "id": null,
    "text": "mutation CustomerNewPageMutation(\n  $input: RegisterCustomerInput!\n) {\n  customerMutation {\n    register(input: $input) {\n      customer {\n        phone\n        category\n        state\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5b27872486d9779b3ec6fc8cee4cd701';
module.exports = node;
