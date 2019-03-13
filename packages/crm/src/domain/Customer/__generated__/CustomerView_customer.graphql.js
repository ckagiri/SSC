/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type CustomerHeader_customer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type CustomerView_customer$ref: FragmentReference;
export type CustomerView_customer = {|
  +phone: ?string,
  +introducedBy?: ?{|
    +fullName: ?string,
    +phone: ?string,
  |},
  +teleconsultant?: ?{|
    +shortName: ?string
  |},
  +preconsultant?: ?{|
    +shortName: ?string
  |},
  +consultant?: ?{|
    +shortName: ?string
  |},
  +$fragmentRefs: CustomerHeader_customer$ref,
  +$refType: CustomerView_customer$ref,
|};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "phone",
  "args": null,
  "storageKey": null
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "shortName",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "CustomerView_customer",
  "type": "Contact",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    (v0/*: any*/),
    {
      "kind": "FragmentSpread",
      "name": "CustomerHeader_customer",
      "args": null
    },
    {
      "kind": "InlineFragment",
      "type": "Customer",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "introducedBy",
          "storageKey": null,
          "args": null,
          "concreteType": null,
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "fullName",
              "args": null,
              "storageKey": null
            },
            (v0/*: any*/)
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
          "selections": (v1/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "preconsultant",
          "storageKey": null,
          "args": null,
          "concreteType": null,
          "plural": false,
          "selections": (v1/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "consultant",
          "storageKey": null,
          "args": null,
          "concreteType": null,
          "plural": false,
          "selections": (v1/*: any*/)
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '912d068b7a5abb0eda755cd54229d961';
module.exports = node;
