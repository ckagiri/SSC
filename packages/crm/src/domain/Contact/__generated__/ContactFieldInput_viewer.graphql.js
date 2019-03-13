/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ContactFieldInput_viewer$ref: FragmentReference;
export type ContactFieldInput_viewer = {|
  +contactBy: ?{|
    +id: string,
    +category: any,
    +fullName: ?string,
    +phone: ?string,
    +discount: ?number,
    +addresses: ?$ReadOnlyArray<?{|
      +city: ?string,
      +town: ?string,
    |}>,
    +shortName?: ?string,
    +position?: ?{|
      +title: string
    |},
    +consultant?: ?{|
      +id: string,
      +fullName: ?string,
      +shortName: ?string,
      +position: ?{|
        +title: string
      |},
    |},
  |},
  +$refType: ContactFieldInput_viewer$ref,
|};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fullName",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "shortName",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "position",
  "storageKey": null,
  "args": null,
  "concreteType": "Position",
  "plural": false,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    }
  ]
};
return {
  "kind": "Fragment",
  "name": "ContactFieldInput_viewer",
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
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "category",
          "args": null,
          "storageKey": null
        },
        (v1/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "phone",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "discount",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "addresses",
          "storageKey": null,
          "args": null,
          "concreteType": "Address",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "city",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "town",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "InlineFragment",
          "type": "Customer",
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "consultant",
              "storageKey": null,
              "args": null,
              "concreteType": null,
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                (v2/*: any*/),
                (v3/*: any*/)
              ]
            }
          ]
        },
        {
          "kind": "InlineFragment",
          "type": "Staff",
          "selections": [
            (v2/*: any*/),
            (v3/*: any*/)
          ]
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = '971ff1a9ce9d32f7d5f6ebdb85288b8a';
module.exports = node;
