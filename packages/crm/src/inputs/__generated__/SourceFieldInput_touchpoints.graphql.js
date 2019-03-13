/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type SourceFieldInput_touchpoints$ref: FragmentReference;
export type SourceFieldInput_touchpoints = $ReadOnlyArray<{|
  +title: string,
  +fields: ?$ReadOnlyArray<?any>,
  +list: ?$ReadOnlyArray<?string>,
  +state: ?any,
  +$refType: SourceFieldInput_touchpoints$ref,
|}>;
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "SourceFieldInput_touchpoints",
  "type": "Touchpoint",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "fields",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "list",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "state",
      "args": null,
      "storageKey": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '60dd34d984d09f6a35156fc08d1f94ba';
module.exports = node;
