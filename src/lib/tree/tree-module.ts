/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CdkTreeModule } from '@ptsecurity/cdk/tree';
// import { MatCommonModule } from '@ptsecurity/mosaic/core';

import { McNestedTreeNode, McTreeNodeDef, McTreeNode } from './node';
import { McTreeNodeOutlet } from './outlet';
import { McTreeNodePadding } from './padding';
import { McTreeNodeToggle } from './toggle';
import { McTree } from './tree';


const MC_TREE_DIRECTIVES = [
    McNestedTreeNode,
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeNodeToggle,
    McTree,
    McTreeNode,
    McTreeNodeOutlet
];

@NgModule({
    // imports: [CdkTreeModule, CommonModule, MatCommonModule],
    imports: [CdkTreeModule, CommonModule],
    exports: MC_TREE_DIRECTIVES,
    declarations: MC_TREE_DIRECTIVES
})
export class McTreeModule {}
