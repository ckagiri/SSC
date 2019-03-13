/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ConsultantFieldInput_consultants$ref: FragmentReference;
export type ConsultantFieldInput_consultants = $ReadOnlyArray<{|
  +shortName: ?string,
  +fullName: ?string,
  +id: string,
  +$refType: ConsultantFieldInput_consultants$ref,
|}>;
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ConsultantFieldInput_consultants",
  "type": "Contact",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "shortName",
      "args": null,
      "storageKey": null
    },
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
      "name": "id",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '3a6b0397139303bd91248fe5135f3be3';
module.exports = node;
