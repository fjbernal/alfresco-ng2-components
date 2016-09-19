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

import {AlfrescoAuthenticationService} from 'ng2-alfresco-core';
import {ProcessInstance} from '../models/process-instance';
import {TaskQueryRequestRepresentationModel} from '../models/filter.model';
import {User} from '../models/user.model';
import {Comment} from '../models/comment.model';
import {Injectable}     from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ActivitiProcessService {

    constructor(public authService: AlfrescoAuthenticationService) {
    }

    /**
     * Retrive all the Deployed app
     * @returns {Observable<any>}
     */
    getDeployedApplications(name: string): Observable<any> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.appsApi.getAppDefinitions())
            .map((response: any) => response.data.find(p => p.name === name))
            .do(data => console.log('Application: ' + JSON.stringify(data)));
    }

    getProcesses(): Observable<ProcessInstance[]> {
        let request = {'page': 0, 'sort': 'created-desc', 'state': 'all'};

        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.processApi.getProcessInstances(request))
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProcessInstances(requestNode: TaskQueryRequestRepresentationModel): Observable<ProcessInstance[]> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.processApi.getProcessInstances(requestNode))
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProcessFilters(appId: string): Observable<any[]> {
        let filterOpts = appId ? {
            appId: appId
        } : {};
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.userFiltersApi.getUserProcessInstanceFilters(filterOpts))
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProcess(id: string): Observable<ProcessInstance> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.processApi.getProcessInstance(id))
            .catch(this.handleError);
    }

    getProcessTasks(id: string, state: string): Observable<any[]> {
        let taskOpts = state ? {
            processInstanceId: id,
            state: state
        } : {
            processInstanceId: id
        };
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.taskApi.listTasks(taskOpts))
            .map(this.extractData)
            .map(tasks => tasks.map((task: any) => {
                task.created = new Date(task.created);
                return task;
            }))
            .catch(this.handleError);
    }

    /**
     * Retrive all the process instance's comments
     * @param id - process instance ID
     * @returns {<Comment[]>}
     */
    getProcessInstanceComments(id: string): Observable<Comment[]> {
        return Observable.fromPromise(this.authService.getAlfrescoApi().activiti.commentsApi.getProcessInstanceComments(id))
            .map(res => res)
            .map((response: any) => {
                let comments: Comment[] = [];
                response.data.forEach((comment) => {
                    let user = new User(
                        comment.createdBy.id, comment.createdBy.email, comment.createdBy.firstName, comment.createdBy.lastName);
                    comments.push(new Comment(comment.id, comment.message, comment.created, user));
                });
                return comments;
            }).catch(this.handleError);
    }

    /**
     * Add a comment to a process instance
     * @param id - process instance Id
     * @param message - content of the comment
     * @returns {Comment}
     */
    addProcessInstanceComment(id: string, message: string): Observable<Comment> {
        return Observable.fromPromise(
                this.authService.getAlfrescoApi().activiti.commentsApi.addProcessInstanceComment({message: message}, id)
            )
            .map(res => res)
            .map((response: Comment) => {
                return new Comment(response.id, response.message, response.created, response.createdBy);
            }).catch(this.handleError);

    }

    getProcessDefinitions(appId: string) {
        let opts = appId ? {
            latest: true,
            appId: appId
        } : {
            latest: true
        };
        return Observable.fromPromise(
            this.authService.getAlfrescoApi().activiti.processApi.getProcessDefinitions(opts)
            )
            .map(this.extractData)
            .catch(this.handleError);
    }

    startProcess(processDefinitionId: string, name: string) {
        let startRequest: any = {};
        startRequest.name = name;
        startRequest.processDefinitionId = processDefinitionId;
        return Observable.fromPromise(
            this.authService.getAlfrescoApi().activiti.processApi.startNewProcessInstance(startRequest)
            )
            .catch(this.handleError);
    }

    cancelProcess(processInstanceId: string) {
        return Observable.fromPromise(
            this.authService.getAlfrescoApi().activiti.processApi.deleteProcessInstance(processInstanceId)
            )
            .catch(this.handleError);
    }

    private extractData(res: any) {
        return res.data || {};
    }

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}
