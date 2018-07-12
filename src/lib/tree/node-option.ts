import { Directive, ElementRef, Input } from '@angular/core';

import { CdkTree, CdkTreeNode } from '@ptsecurity/cdk/tree';

import { CanDisable, toBoolean } from '@ptsecurity/mosaic/core';


/**
 * Wrapper for the CdkTree node with Material design styles.
 */
@Directive({
    exportAs: 'mcTreeNodeOption',
    selector: 'mc-tree-node-option',
    host: {
        tabindex: '-1',
        '[class.mc-selected]': 'selected',
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

    @Input()
    get selected(): boolean {
        return this._tree.selectedOptions && this._tree.selectedOptions.isSelected(this) || false;
    }

    set selected(value: boolean) {
        const isSelected = toBoolean(value);

        if (isSelected !== this._selected) {
            this.setSelected(isSelected);

            // this._tree._reportValueChange();
        }
    }

    private _hasFocus: boolean = false;

    private _disabled: boolean = false;
    private _selected: boolean = false;

    constructor(protected _elementRef: ElementRef, protected _tree: CdkTree<T>) {
        super(_elementRef, _tree);
    }

    focus(): void {
        this._elementRef.nativeElement.focus();

        this._tree.setFocusedOption(this);
    }

    toggle(): void {
        this.selected = !this.selected;
    }

    setSelected(selected: boolean) {
        if (this._selected === selected || !this._tree.selectedOptions) { return; }

        this._selected = selected;

        if (selected) {
            this._tree.selectedOptions.select(this);
        } else {
            this._tree.selectedOptions.deselect(this);
        }

        // this._changeDetector.markForCheck();
    }

    _handleFocus(): void {
        if (this.disabled || this._hasFocus) { return; }

        this._hasFocus = true;
    }

    _handleBlur(): void {
        this._hasFocus = false;
    }

    _handleClick(): void {
        if (this.disabled) { return; }

        this._tree.setFocusedOption(this);
    }
}
