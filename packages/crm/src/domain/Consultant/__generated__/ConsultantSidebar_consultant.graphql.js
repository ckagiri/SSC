/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type ConsultantHeader_consultant$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type ConsultantSidebar_consultant$ref: FragmentReference;
export type ConsultantSidebar_consultant = {|
  +inbox?: ?{|
    +totalCount: ?number
  |},
  +today?: ?{|
    +totalCount: ?number
  |},
  +call?: ?{|
    +totalCount: ?number
  |},
  +schedule?: ?{|
    +totalCount: ?number
  |},
  +favorite?: ?{|
    +totalCount: ?number
  |},
  +customers?: ?{|
    +totalCount: ?number
  |},
  +outbox?: ?{|
    +totalCount: ?number
  |},
  +$fragmentRefs: ConsultantHeader_consultant$ref,
  +$refType: ConsultantSidebar_consultant$ref,
|};
*/


const node/*: ReaderFragment*/ = (function(){
var v0 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "totalCount",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "ConsultantSidebar_consultant",
  "type": "Contact",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ConsultantHeader_consultant",
      "args": null
    },
    {
      "kind": "InlineFragment",
      "type": "Staff",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "inbox",
          "storageKey": null,
          "args": null,
          "concreteType": "AssignmentConnection",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "today",
          "storageKey": null,
          "args": null,
          "concreteType": "AssignmentConnection",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "call",
          "storageKey": null,
          "args": null,
          "concreteType": "ContactConnection",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "schedule",
          "storageKey": null,
          "args": null,
          "concreteType": "AssignmentConnection",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "favorite",
          "storageKey": null,
          "args": null,
          "concreteType": "CustomerConnection",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "customers",
          "storageKey": null,
          "args": null,
          "concreteType": "CustomerConnection",
          "plural": false,
          "selections": (v0/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "outbox",
          "storageKey": null,
          "args": null,
          "concreteType": "AssignmentConnection",
          "plural": false,
          "selections": (v0/*: any*/)
        }
      ]
    }
  ]
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bc556a776df0a9bdd8a5f02e5719b03a';
module.exports = node;
