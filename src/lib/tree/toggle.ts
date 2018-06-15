/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Directive, Input } from '@angular/core';

import { CdkTreeNodeToggle } from '@ptsecurity/cdk/tree';


/**
 * Wrapper for the CdkTree's toggle with Material design styles.
 */
@Directive({
    selector: '[mcTreeNodeToggle]',
    host: {
        '(click)': '_toggle($event)'
    },
    providers: [{ provide: CdkTreeNodeToggle, useExisting: McTreeNodeToggle }]
})
export class McTreeNodeToggle<T> extends CdkTreeNodeToggle<T> {
    @Input('mсTreeNodeToggleRecursive') recursive: boolean = false;
}
