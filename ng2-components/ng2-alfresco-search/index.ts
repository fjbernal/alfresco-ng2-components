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

import { ALFRESCO_CORE_PROVIDERS /*, AlfrescoPipeTranslate*/ } from 'ng2-alfresco-core';

import { AlfrescoSearchService } from './src/services/alfresco-search.service';
import { AlfrescoThumbnailService } from './src/services/alfresco-thumbnail.service';
import { AlfrescoSearchComponent } from './src/components/alfresco-search.component';
import { AlfrescoSearchControlComponent } from './src/components/alfresco-search-control.component';
import { AlfrescoSearchAutocompleteComponent } from './src/components/alfresco-search-autocomplete.component';

// services
export * from './src/services/alfresco-search.service';
export * from './src/services/alfresco-thumbnail.service';
export * from './src/components/alfresco-search.component';
export * from './src/components/alfresco-search-control.component';

// todo: deprecate
export const ALFRESCO_SEARCH_DIRECTIVES: [any] = [
    AlfrescoSearchComponent,
    AlfrescoSearchControlComponent,
    AlfrescoSearchAutocompleteComponent
];

// todo: deprecate
export const ALFRESCO_SEARCH_PROVIDERS: [any] = [
    AlfrescoSearchService,
    AlfrescoThumbnailService
];


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        TranslateModule
    ],
    declarations: [
        // AlfrescoPipeTranslate,
        AlfrescoSearchComponent,
        AlfrescoSearchControlComponent,
        AlfrescoSearchAutocompleteComponent
    ],
    providers: [
        ...ALFRESCO_CORE_PROVIDERS,
        AlfrescoSearchService,
        AlfrescoThumbnailService
    ],
    exports: [
        AlfrescoSearchComponent,
        AlfrescoSearchControlComponent,
        AlfrescoSearchAutocompleteComponent
    ]
})
export class SearchModule { }
