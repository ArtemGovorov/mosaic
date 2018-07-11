import { Directive, ElementRef, Input } from '@angular/core';

import { CdkTree, CdkTreeNode } from '@ptsecurity/cdk/tree';

import { CanDisable, toBoolean } from '@ptsecurity/mosaic/core';
import { McTreeSelection } from '@ptsecurity/mosaic/tree/tree';


/**
 * Wrapper for the CdkTree node with Material design styles.
 */
@Directive({
    exportAs: 'mcTreeNodeOption',
    selector: 'mc-tree-node-option',
    host: {
        tabindex: '-1',
        '[class.mc-focused]': '_hasFocus',
        '[attr.aria-expanded]': 'isExpanded',
        '[attr.aria-level]': 'role === "treeitem" ? level : null',
        class: 'mc-tree-node',

        '(focus)': '_handleFocus()',
        '(blur)': '_handleBlur()',

        '(click)': '_handleClick()'
    },
    providers: [
        { provide: CdkTreeNode, useExisting: McTreeNodeOption }
    ]
})
export class McTreeNodeOption<T> extends CdkTreeNode<T> implements CanDisable {
    @Input() role: 'treeitem' | 'group' = 'treeitem';

    private _hasFocus: boolean = false;

    private _disabled: boolean = false;

    @Input()
    get disabled() {
        return this._disabled;
    }

    set disabled(value: any) {
        const newValue = toBoolean(value);

        if (newValue !== this._disabled) {
            this._disabled = newValue;
        }
    }

    constructor(protected _elementRef: ElementRef, protected _tree: CdkTree<T>) {
        super(_elementRef, _tree);
    }

    _handleFocus() {
        if (this.disabled || this._hasFocus) { return; }

        this._hasFocus = true;
    }

    _handleBlur() {
        this._hasFocus = false;
    }

    _handleClick() {
        this._tree.setFocusedOption(this);
    }
}
