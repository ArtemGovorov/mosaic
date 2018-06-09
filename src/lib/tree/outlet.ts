/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {CdkTreeNodeOutlet} from '@ptsecurity/cdk/tree';

import { Directive, ViewContainerRef } from '@angular/core';


/**
 * Outlet for nested CdkNode. Put `[mcTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
@Directive({
  selector: '[mcTreeNodeOutlet]'
})
export class McTreeNodeOutlet implements CdkTreeNodeOutlet {
  constructor(public viewContainer: ViewContainerRef) {}
}
