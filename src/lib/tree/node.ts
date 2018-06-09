/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
    AfterContentInit,
    Attribute,
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

import { CanDisable, HasTabIndex, mixinDisabled, mixinTabIndex } from '@ptsecurity/mosaic/core';

import { McTreeNodeOutlet } from './outlet';


export const _MatTreeNodeMixinBase = mixinTabIndex(mixinDisabled(CdkTreeNode));
export const _MatNestedTreeNodeMixinBase = mixinTabIndex(mixinDisabled(CdkNestedTreeNode));

/**
 * Wrapper for the CdkTree node with Material design styles.
 */
@Directive({
    selector: 'mc-tree-node',
    exportAs: 'mcTreeNode',
    inputs: ['disabled', 'tabIndex'],
    host: {
        '[attr.aria-expanded]': 'isExpanded',
        '[attr.aria-level]': 'role === "treeitem" ? level : null',
        '[attr.role]': 'role',
        class: 'mc-tree-node'
    },
    providers: [{ provide: CdkTreeNode, useExisting: McTreeNode }]
})
export class McTreeNode<T> extends _MatTreeNodeMixinBase<T> implements CanDisable, HasTabIndex {
    @Input() role: 'treeitem' | 'group' = 'treeitem';

    constructor(
        protected _elementRef: ElementRef,
        protected _tree: CdkTree<T>,
        @Attribute('tabindex') tabIndex: string
    ) {
        super(_elementRef, _tree);

        this.tabIndex = Number(tabIndex) || 0;
    }
}

/**
 * Wrapper for the CdkTree node definition with Material design styles.
 */
@Directive({
    selector: '[mcTreeNodeDef]',
    inputs: [
        'when: mcTreeNodeDefWhen'
    ],
    providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }]
})
export class McTreeNodeDef<T> extends CdkTreeNodeDef<T> {
    @Input('mcTreeNode') data: T;
}

/**
 * Wrapper for the CdkTree nested node with Material design styles.
 */
@Directive({
    selector: 'mc-nested-tree-node',
    exportAs: 'mcNestedTreeNode',
    host: {
        '[attr.aria-expanded]': 'isExpanded',
        '[attr.role]': 'role',
        class: 'mc-nested-tree-node'
    },
    inputs: ['disabled', 'tabIndex'],
    providers: [
        { provide: CdkNestedTreeNode, useExisting: McNestedTreeNode },
        { provide: CdkTreeNode, useExisting: McNestedTreeNode }
    ]
})
export class McNestedTreeNode<T> extends _MatNestedTreeNodeMixinBase<T>
    implements AfterContentInit, CanDisable, HasTabIndex, OnDestroy {

    @Input('matNestedTreeNode') node: T;

    @ContentChildren(McTreeNodeOutlet) nodeOutlet: QueryList<McTreeNodeOutlet>;

    constructor(
        protected _elementRef: ElementRef,
        protected _tree: CdkTree<T>,
        protected _differs: IterableDiffers,
        @Attribute('tabindex') tabIndex: string
    ) {
        super(_elementRef, _tree, _differs);

        this.tabIndex = Number(tabIndex) || 0;
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
