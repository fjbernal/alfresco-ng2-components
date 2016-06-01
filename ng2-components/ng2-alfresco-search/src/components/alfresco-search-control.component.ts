/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Control, Validators } from 'angular2/common';
import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { AlfrescoService } from './../services/alfresco.service';

declare let __moduleName: string;
declare var componentHandler: any;

@Component({
    moduleId: __moduleName,
    selector: 'alfresco-search-control',
    styles: [
    ],
    templateUrl: './alfresco-search-control.component.html',
    providers: [AlfrescoService]
})
export class AlfrescoSearchControlComponent {

    @Input()
    searchTerm = '';

    @Output()
    searchChange = new EventEmitter();

    searchControl: Control;

    constructor() {

        this.searchControl = new Control(
            this.searchTerm,
            Validators.compose([Validators.required, Validators.minLength(3)])
        );

    }

    ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }

    /**
     * Method called on form submit, i.e. when the user has hit enter
     *
     * @param event Submit event that was fired
     */
    onSearch(event) {
        if (event) {
            event.preventDefault();
        }
        if (this.searchControl.valid) {
            this.searchChange.emit({
                value: this.searchTerm
            });
            // this.router.navigate(['Search', term]);
        }
    }

}
