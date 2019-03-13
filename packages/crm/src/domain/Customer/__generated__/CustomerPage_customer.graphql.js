/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type Consultation_customer$ref = any;
type CustomerView_customer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type CustomerPage_customer$ref: FragmentReference;
export type CustomerPage_customer = {|
  +phone: ?string,
  +state: ?any,
  +$fragmentRefs: CustomerView_customer$ref & Consultation_customer$ref,
  +$refType: CustomerPage_customer$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CustomerPage_customer",
  "type": "Customer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "name": "state",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "CustomerView_customer",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Consultation_customer",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '81a083463189dcc909740fc6a94387a9';
module.exports = node;
