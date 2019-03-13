/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ConsultantHeader_consultant$ref: FragmentReference;
export type ConsultantHeader_consultant = {|
  +shortName: ?string,
  +$refType: ConsultantHeader_consultant$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ConsultantHeader_consultant",
  "type": "Contact",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "shortName",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '12094b1c45c2316f084efce0a547d74e';
module.exports = node;
