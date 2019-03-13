/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type TownFieldInput_towns$ref: FragmentReference;
export type TownFieldInput_towns = $ReadOnlyArray<{|
  +name: string,
  +$refType: TownFieldInput_towns$ref,
|}>;
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "TownFieldInput_towns",
  "type": "Town",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '5f150d528e6708942420461060dd3cf7';
module.exports = node;
