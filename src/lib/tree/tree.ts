/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CdkTree } from '@ptsecurity/cdk/tree';

import { McTreeNodeOutlet } from './outlet';


/**
 * Wrapper for the CdkTable with Material design styles.
 */
@Component({
    selector: 'mc-tree',
    exportAs: 'mcTree',
    template: `
        <ng-container mcTreeNodeOutlet></ng-container>`,
    host: {
        class: 'mc-tree',
        role: 'tree'
    },
    styleUrls: ['tree.css'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: CdkTree, useExisting: McTree }]
})
export class McTree<T> extends CdkTree<T> {
    // Outlets within the tree's template where the dataNodes will be inserted.
    @ViewChild(McTreeNodeOutlet) _nodeOutlet: McTreeNodeOutlet;
}

