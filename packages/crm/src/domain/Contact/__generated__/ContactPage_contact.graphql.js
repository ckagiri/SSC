/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ContactTopbar_contact$ref = any;
type CustomerPage_customer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ContactPage_contact$ref: FragmentReference;
export type ContactPage_contact = {|
  +fullName: ?string,
  +category: any,
  +$fragmentRefs: ContactTopbar_contact$ref & CustomerPage_customer$ref,
  +$refType: ContactPage_contact$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ContactPage_contact",
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
      "name": "category",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ContactTopbar_contact",
      "args": null
    },
    {
      "kind": "InlineFragment",
      "type": "Customer",
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "CustomerPage_customer",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'd7f6bfaa955c2b30db76d0cd286197ee';
module.exports = node;
