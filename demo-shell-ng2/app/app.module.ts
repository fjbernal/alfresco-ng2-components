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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { LoginModule } from 'ng2-alfresco-login';

import {
    ALFRESCO_SEARCH_DIRECTIVES,
    ALFRESCO_SEARCH_PROVIDERS
} from 'ng2-alfresco-search';
import {
    ALFRESCO_ULPOAD_COMPONENTS,
    ALFRESCO_ULPOAD_DIRECTIVES,
    ALFRESCO_ULPOAD_SERVICES
} from 'ng2-alfresco-upload';
import { ALFRESCO_DATATABLE_DIRECTIVES, PaginationComponent } from 'ng2-alfresco-datatable';
import { ALFRESCO_TASKLIST_DIRECTIVES } from 'ng2-activiti-tasklist';
import { ACTIVITI_PROCESSLIST_DIRECTIVES } from 'ng2-activiti-processlist';
import { VIEWERCOMPONENT } from 'ng2-alfresco-viewer';
import { TAGCOMPONENT, TAGSERVICES } from 'ng2-alfresco-tag';
import { WEBSCRIPTCOMPONENT } from 'ng2-alfresco-webscript';
import {
    ALFRESCO_CORE_PROVIDERS,
    CONTEXT_MENU_DIRECTIVES,
    MDL/*,
    AlfrescoPipeTranslate*/
} from 'ng2-alfresco-core';

import {
    ActivitiForm,
    ATIVITI_FORM_PROVIDERS,
    TabsWidget, ContainerWidget,
    TextWidget,
    NumberWidget,
    CheckboxWidget,
    MultilineTextWidget,
    DropdownWidget,
    HyperlinkWidget,
    RadioButtonsWidget,
    DisplayValueWidget,
    DisplayTextWidget,
    UploadWidget,
    AttachWidget,
    TypeaheadWidget,
    FunctionalGroupWidget,
    PeopleWidget
} from 'ng2-activiti-form';

import {
    DOCUMENT_LIST_DIRECTIVES,
    DOCUMENT_LIST_PROVIDERS
} from 'ng2-alfresco-documentlist';

// import { AlfrescoLoginComponent } from 'ng2-alfresco-login';
import { FormNodeViewer } from './components/activiti/form-node-viewer.component';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import {
    UploadButtonComponent,
    DataTableDemoComponent,
    SearchComponent,
    SearchBarComponent,
    LoginDemoComponent,
    ActivitiDemoComponent,
    FormViewer,
    WebscriptComponent,
    TagComponent,
    AboutComponent,
    FilesComponent,
} from './components/index';

// todo: temp
const ACTIVITI_FORM_DIRECTIVES: any[] = [
    ActivitiForm,

    TabsWidget,
    ContainerWidget,
    TextWidget,
    NumberWidget,
    CheckboxWidget,
    MultilineTextWidget,
    DropdownWidget,
    HyperlinkWidget,
    RadioButtonsWidget,
    DisplayValueWidget,
    DisplayTextWidget,
    UploadWidget,
    AttachWidget,
    TypeaheadWidget,
    FunctionalGroupWidget,
    PeopleWidget
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        TranslateModule.forRoot(),
        LoginModule
    ],
    declarations: [
        AppComponent,
        MDL,
        // x: AlfrescoPipeTranslate,
        ...CONTEXT_MENU_DIRECTIVES,
        ...ACTIVITI_FORM_DIRECTIVES,
        ...ALFRESCO_DATATABLE_DIRECTIVES, PaginationComponent,
        ...ALFRESCO_TASKLIST_DIRECTIVES,
        ...ACTIVITI_PROCESSLIST_DIRECTIVES,
        ...DOCUMENT_LIST_DIRECTIVES,
        ...ALFRESCO_ULPOAD_COMPONENTS,
        ...VIEWERCOMPONENT,
        ...ALFRESCO_SEARCH_DIRECTIVES,
        ...TAGCOMPONENT,
        ...WEBSCRIPTCOMPONENT,
        ...ALFRESCO_ULPOAD_COMPONENTS,
        ...ALFRESCO_ULPOAD_DIRECTIVES,

        UploadButtonComponent,
        DataTableDemoComponent,
        SearchComponent,
        SearchBarComponent,
        LoginDemoComponent,
        ActivitiDemoComponent,
        FormViewer,
        WebscriptComponent,
        TagComponent,
        AboutComponent,
        FilesComponent,
        FormNodeViewer
    ],
    providers: [
        ...ALFRESCO_CORE_PROVIDERS,
        ...ATIVITI_FORM_PROVIDERS,
        ...DOCUMENT_LIST_PROVIDERS,
        ...TAGSERVICES,
        ...ALFRESCO_ULPOAD_SERVICES,
        ...ALFRESCO_SEARCH_PROVIDERS
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
