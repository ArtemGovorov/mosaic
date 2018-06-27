import { CanDisable, HasTabIndex, mixinDisabled, mixinTabIndex, toBoolean } from '@ptsecurity/mosaic/core';

import {
    AfterContentInit, AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ContentChildren, Input,
    IterableDiffers, QueryList,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { FocusKeyManager } from '@ptsecurity/cdk/a11y';
import { CdkTree } from '@ptsecurity/cdk/tree';

import { END, ENTER, HOME, PAGE_DOWN, PAGE_UP, SPACE } from '@ptsecurity/cdk/keycodes';

import { McTreeNodeOption } from './node-option';
import { McTreeNodeOutlet } from './outlet';
import { McListOption } from '@ptsecurity/mosaic/list/list-selection.component';


export const _McTreeSelectionMixinBase = mixinTabIndex(mixinDisabled(CdkTree));

/**
 * Wrapper for the CdkTable with Material design styles.
 */
@Component({
    exportAs: 'mcTreeSelection',
    selector: 'mc-tree-selection',
    template: `<ng-container mcTreeNodeOutlet></ng-container>`,
    host: {
        '[tabIndex]': 'tabIndex',
        class: 'mc-tree',
        role: 'tree-selection',
        '(keydown)': '_onKeyDown($event)'
    },
    styleUrls: ['./tree.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: CdkTree, useExisting: McTreeSelection }]
})
export class McTreeSelection<T> extends _McTreeSelectionMixinBase<T>
    implements AfterContentInit, AfterViewInit, CanDisable, HasTabIndex {
    // Outlets within the tree's template where the dataNodes will be inserted.
    @ViewChild(McTreeNodeOutlet) _nodeOutlet: McTreeNodeOutlet;

    @ContentChildren(McTreeNodeOption) options: QueryList<McTreeNodeOption>;

    _keyManager: FocusKeyManager<McTreeNodeOption>;

    _disabled: boolean = false;
    tabIndex: number;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(rawValue: boolean) {
        const value = toBoolean(rawValue);

        if (this._disabled !== value) {
            this._disabled = value;

            if (this._disabled) {
                console.log('need disable all options');
            } else {
                console.log('need enable all options');
            }
        }

    }

    constructor(
        _differs: IterableDiffers,
        _changeDetectorRef: ChangeDetectorRef,
        @Attribute('tabindex') tabIndex: string
    ) {
        super(_differs, _changeDetectorRef);

        this.tabIndex = parseInt(tabIndex) || 0;
    }

    _onKeyDown(event: KeyboardEvent) {
        const keyCode = event.keyCode;

        switch (keyCode) {
            case SPACE:
            case ENTER:
                console.log('need select');
                event.preventDefault();

                break;
            case HOME:
                console.log('need set focus on first node');
                event.preventDefault();

                break;
            case END:
                console.log('need set focus on last node');
                event.preventDefault();

                break;
            case PAGE_UP:
                console.log('need do scroll page and set focus on first in viewport');

                event.preventDefault();

                break;
            case PAGE_DOWN:
                console.log('need do scroll page and set focus on last in viewport');

                event.preventDefault();

                break;
            default:
                console.log('do all other actions');
        }
    }

    ngAfterContentInit(): void {
        console.log('ngAfterContentInit');

        this._keyManager = new FocusKeyManager<McListOption>(this.options)
            .withTypeAhead()
            .withVerticalOrientation(true)
            .withHorizontalOrientation(null);
    }

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit');
    }
}

