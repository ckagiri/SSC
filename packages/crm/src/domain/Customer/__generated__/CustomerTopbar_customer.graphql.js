/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type CustomerView_customer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type CustomerTopbar_customer$ref: FragmentReference;
export type CustomerTopbar_customer = {|
  +fullName: ?string,
  +phone: ?string,
  +$fragmentRefs: CustomerView_customer$ref,
  +$refType: CustomerTopbar_customer$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "CustomerTopbar_customer",
  "type": "Contact",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
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
      "kind": "FragmentSpread",
      "name": "CustomerView_customer",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '5d83de0d1df92f0438db4ee1c4e32ce2';
module.exports = node;
