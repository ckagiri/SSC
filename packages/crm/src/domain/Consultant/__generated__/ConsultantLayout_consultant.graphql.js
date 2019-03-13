/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ConsultantSidebar_consultant$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ConsultantLayout_consultant$ref: FragmentReference;
export type ConsultantLayout_consultant = {|
  +$fragmentRefs: ConsultantSidebar_consultant$ref,
  +$refType: ConsultantLayout_consultant$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ConsultantLayout_consultant",
  "type": "Contact",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ConsultantSidebar_consultant",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'c943160cea69ef0349fd7db7556914c9';
module.exports = node;
