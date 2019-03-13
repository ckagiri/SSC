/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type CustomerView_customer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ContactSidebar_contact$ref: FragmentReference;
export type ContactSidebar_contact = {|
  +$fragmentRefs: CustomerView_customer$ref,
  +$refType: ContactSidebar_contact$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ContactSidebar_contact",
  "type": "Contact",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "CustomerView_customer",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '4c3209e06d3bc4569b6578ebb012b713';
module.exports = node;
