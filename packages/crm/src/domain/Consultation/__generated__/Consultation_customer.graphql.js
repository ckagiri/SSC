/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type Preconsultation_customer$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type Consultation_customer$ref: FragmentReference;
export type Consultation_customer = {|
  +state: ?any,
  +$fragmentRefs: Preconsultation_customer$ref,
  +$refType: Consultation_customer$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "Consultation_customer",
  "type": "Customer",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "state",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "Preconsultation_customer",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '9c3631df269d297253f656cbb168eacd';
module.exports = node;
