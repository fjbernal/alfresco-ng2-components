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

import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { AlfrescoSettingsService } from 'ng2-alfresco-core';
import { TaskDetailsModel } from '../models/task-details.model';
import { FormModel, FormService } from 'ng2-activiti-form';

declare let componentHandler: any;
declare let __moduleName: string;

@Component({
    selector: 'activiti-task-header',
    moduleId: __moduleName,
    templateUrl: './activiti-task-header.component.html',
    styleUrls: ['./activiti-task-header.component.css'],
    providers: [ FormService ]
})
export class ActivitiTaskHeader implements OnInit, OnChanges {

    @Input()
    taskDetails: TaskDetailsModel;

    taskForm: FormModel;

    constructor(private formService: FormService,
                private settings: AlfrescoSettingsService) {

        if (settings) {
            settings.addTranslationFolder('node_modules/ng2-activiti-tasklist/src');
        }
    }

    ngOnInit() {
        if (this.taskDetails && this.taskDetails.formKey) {
            this.load(this.taskDetails.id);
        }
    }

    ngOnChanges(change) {
        if (this.taskDetails && this.taskDetails.formKey) {
            this.load(this.taskDetails.id);
        } else {
            this.taskForm = null;
        }
    }

    public load(taskId: string) {
        if (taskId) {
            this.formService.getTaskForm(taskId).subscribe(
                (response) => {
                    this.taskForm = response;
                },
                (err) => {
                    console.error(err);
                }
            );
        }
    }
}
