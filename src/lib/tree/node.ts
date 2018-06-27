import {
    AfterContentInit,
    ContentChildren,
    Directive,
    ElementRef,
    Input,
    IterableDiffers,
    OnDestroy,
    QueryList
} from '@angular/core';

import {
    CdkNestedTreeNode,
    CdkTree,
    CdkTreeNode,
    CdkTreeNodeDef
} from '@ptsecurity/cdk/tree';

import { CanDisable, mixinDisabled } from '@ptsecurity/mosaic/core';

import { McTreeNodeOutlet } from './outlet';


export const _MatNestedTreeNodeMixinBase = mixinDisabled(CdkNestedTreeNode);


/**
 * Wrapper for the CdkTree node definition with Material design styles.
 */
@Directive({
    selector: '[mcTreeNodeDef]',
    inputs: ['when: mcTreeNodeDefWhen'],
    providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }]
})
export class McTreeNodeDef<T> extends CdkTreeNodeDef<T> {
    @Input('mcTreeNode') data: T;
}

/**
 * Wrapper for the CdkTree nested node with Material design styles.
 */
@Directive({
    selector: 'mc-tree-nested-node',
    exportAs: 'mcNestedTreeNode',
    host: {
        '[attr.aria-expanded]': 'isExpanded',
        class: 'mc-tree-nested-node'
    },
    inputs: ['disabled', 'tabIndex'],
    providers: [
        { provide: CdkNestedTreeNode, useExisting: McNestedTreeNode },
        { provide: CdkTreeNode, useExisting: McNestedTreeNode }
    ]
})
export class McNestedTreeNode<T> extends _MatNestedTreeNodeMixinBase<T>
    implements AfterContentInit, CanDisable, OnDestroy {

    @Input('matNestedTreeNode') node: T;

    @ContentChildren(McTreeNodeOutlet) nodeOutlet: QueryList<McTreeNodeOutlet>;

    constructor(
        protected _elementRef: ElementRef,
        protected _tree: CdkTree<T>,
        protected _differs: IterableDiffers
    ) {
        super(_elementRef, _tree, _differs);
    }

    // This is a workaround for https://github.com/angular/angular/issues/23091
    // In aot mode, the lifecycle hooks from parent class are not called.
    // TODO(tinayuangao): Remove when the angular issue #23091 is fixed
    ngAfterContentInit() {
        super.ngAfterContentInit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
}
