import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CdkTreeModule } from '@ptsecurity/cdk/tree';
// import { MatCommonModule } from '@ptsecurity/mosaic/core';
import { CdkTreeNodeOutlet } from '@ptsecurity/cdk/tree/outlet';

import { McNestedTreeNode, McTreeNodeDef } from './node';
import { McTreeNodeOption } from './node-option';
import { McTreeNodePadding } from './padding';
import { McTreeNodeToggle } from './toggle';
import { McTreeSelection } from './tree';


const MC_TREE_DIRECTIVES = [
    McNestedTreeNode,
    McTreeNodeDef,
    McTreeNodePadding,
    McTreeNodeToggle,
    McTreeSelection,
    McTreeNodeOption,
    CdkTreeNodeOutlet
];

@NgModule({
    // imports: [CdkTreeModule, CommonModule, MatCommonModule],
    imports: [CommonModule],
    exports: MC_TREE_DIRECTIVES,
    declarations: MC_TREE_DIRECTIVES
})
export class McTreeModule {}
