/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PrefixFieldInput_prefixes$ref: FragmentReference;
export type PrefixFieldInput_prefixes = $ReadOnlyArray<{|
  +value: ?string,
  +title: ?string,
  +$refType: PrefixFieldInput_prefixes$ref,
|}>;
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "PrefixFieldInput_prefixes",
  "type": "StringValues",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "value",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '7e31bd39e41a15f4a7f17671be230a35';
module.exports = node;
