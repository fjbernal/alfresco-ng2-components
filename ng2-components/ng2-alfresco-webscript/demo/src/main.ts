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

import { Component, OnInit } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import {
    ALFRESCO_CORE_PROVIDERS,
    AlfrescoSettingsService,
    AlfrescoAuthenticationService,
    CONTEXT_MENU_DIRECTIVES
} from 'ng2-alfresco-core';

import { WEBSCRIPTCOMPONENT } from 'ng2-alfresco-webscript';

@Component({
    selector: 'alfresco-webscript-demo',
    template: `
               <label for="ticket"><b>Insert a valid access ticket / ticket:</b></label><br>
               <input id="ticket" type="text" size="48" (change)="updateTicket();documentList.reload()" [(ngModel)]="ticket"><br>
               <label for="host"><b>Insert the ip of your Alfresco instance:</b></label><br>
               <input id="host" type="text" size="48" (change)="updateHost();documentList.reload()" [(ngModel)]="ecmHost"><br><br>
               <div *ngIf="!authenticated" style="color:#FF2323">
                    Authentication failed to ip {{ ecmHost }} with user: admin, admin, you can still try to add a valid ticket to perform
                    operations.
               </div>
               <hr>
                <label for="scriptPath"><b>Insert a scriptPath</b></label><br>
                <input id="scriptPath" type="text" size="48"  [(ngModel)]="scriptPath"><br>
                <label for="contextRoot"><b>Insert a contextRoot</b></label><br>
                <input id="contextRoot" type="text" size="48"  [(ngModel)]="contextRoot"><br>
                <label for="servicePath"><b>Insert a servicePath</b></label><br>
                <input id="servicePath" type="text" size="48"  [(ngModel)]="servicePath"><br>
        <div class="container" *ngIf="authenticated">
            <alfresco-webscript-get [scriptPath]="scriptPath"
                           [scriptArgs]="scriptArgs"
                           [contextRoot]="contextRoot"
                           [servicePath]="servicePath"
                           [contentType]="'HTML'"
                           (onSuccess)= "logData($event)"></alfresco-webscript-get>
        </div>
    `,
    directives: [WEBSCRIPTCOMPONENT, CONTEXT_MENU_DIRECTIVES]
})
class WebscriptDemo implements OnInit {

    currentPath: string = '/';

    authenticated: boolean;

    ecmHost: string = 'http://127.0.0.1:8080';

    scriptPath: string = 'sample/folder/Company%20Home';

    contextRoot: string = 'alfresco';

    servicePath: string = 'service';

    scriptArgs: string = '';

    ticket: string;

    constructor(private authService: AlfrescoAuthenticationService,
                private settingsService: AlfrescoSettingsService) {

        settingsService.ecmHost = this.ecmHost;
        settingsService.setProviders('ECM');

        if (this.authService.getTicketEcm()) {
            this.ticket = this.authService.getTicketEcm();
        }
    }

    public updateTicket(): void {
        localStorage.setItem('ticket-ECM', this.ticket);
    }

    public updateHost(): void {
        this.settingsService.ecmHost = this.ecmHost;
        this.login();
    }

    ngOnInit() {
        this.login();
    }

    login() {
        this.authService.login('admin', 'admin').subscribe(
            ticket => {
                console.log(ticket);
                this.ticket = this.authService.getTicketEcm();
                this.authenticated = true;
            },
            error => {
                console.log(error);
                this.authenticated = false;
            });
    }

    logData(data) {
        console.log(data);
    }
}

bootstrap(WebscriptDemo, [
    HTTP_PROVIDERS,
    ALFRESCO_CORE_PROVIDERS
]);
