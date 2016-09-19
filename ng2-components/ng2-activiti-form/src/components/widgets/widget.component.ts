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

import { Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormFieldModel } from './core/index';

declare let __moduleName: string;
declare var componentHandler;

/**
 * Base widget component.
 */
export class WidgetComponent implements AfterViewInit {

    @Input()
    field: FormFieldModel;

    @Output()
    fieldChanged: EventEmitter<FormFieldModel> = new EventEmitter<FormFieldModel>();

    hasField() {
        return this.field ? true : false;
    }

    isRequired(): any {
        if (this.field && this.field.required) {
            return true;
        }
        return null;
    }

    ngAfterViewInit() {
        this.setupMaterialComponents();
        this.fieldChanged.emit(this.field);
    }

    setupMaterialComponents(): boolean {
        // workaround for MDL issues with dynamic components
        if (componentHandler) {
            componentHandler.upgradeAllRegistered();
            return true;
        }
        return false;
    }

    checkVisibility(field: FormFieldModel) {
        this.fieldChanged.emit(field);
    }

}
