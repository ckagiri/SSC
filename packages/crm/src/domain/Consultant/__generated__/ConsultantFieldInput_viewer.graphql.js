/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ConsultantFieldInput_viewer$ref: FragmentReference;
export type ConsultantFieldInput_viewer = {|
  +contactBy: ?{|
    +category: any,
    +fullName: ?string,
    +id: string,
  |},
  +$refType: ConsultantFieldInput_viewer$ref,
|};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "ConsultantFieldInput_viewer",
  "type": "Contact",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "phone",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "contactBy",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "phone",
          "variableName": "phone",
          "type": "String"
        }
      ],
      "concreteType": null,
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "category",
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
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '63be864f734a2770b9e1b8f93100289b';
module.exports = node;
