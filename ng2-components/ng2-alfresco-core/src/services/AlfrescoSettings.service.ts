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

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { AlfrescoTranslationLoader } from './AlfrescoTranslationLoader';

@Injectable()
export class AlfrescoSettingsService {

    static DEFAULT_ECM_ADDRESS: string = 'http://' + window.location.hostname + ':8080';
    static DEFAULT_BPM_ADDRESS: string = 'http://' + window.location.hostname + ':9999';

    static DEFAULT_BPM_CONTEXT_PATH: string = '/activiti-app';

    private _ecmHost: string = AlfrescoSettingsService.DEFAULT_ECM_ADDRESS;
    private _bpmHost: string = AlfrescoSettingsService.DEFAULT_BPM_ADDRESS;

    private _bpmContextPath = AlfrescoSettingsService.DEFAULT_BPM_CONTEXT_PATH;

    private providers: string = 'ALL'; // ECM, BPM , ALL

    bpmHostSubject: Subject<string> = new Subject<string>();
    ecmHostSubject: Subject<string> = new Subject<string>();
    providerSubject: Subject<string> = new Subject<string>();
    userLang: string = 'en' ;

    constructor(private translate: TranslateService) {
        this.userLang = navigator.language.split('-')[0]; // use navigator lang if available
        this.userLang = /(fr|en)/gi.test(this.userLang) ? this.userLang : 'en';
        translate.setDefaultLang(this.userLang);
    }

    addTranslationFolder(name: string = '') {
        let loader = <AlfrescoTranslationLoader> this.translate.currentLoader;
        if (!loader.existComponent(name)) {
            loader.addComponentList(name);
            this.translate.getTranslation(this.userLang);
        }
        this.translate.use(this.userLang);
    }

    get ecmHost(): string {
        return this._ecmHost;
    }

    set ecmHost(ecmHostUrl: string) {
        this.ecmHostSubject.next(ecmHostUrl);
        this._ecmHost = ecmHostUrl;
    }

    get bpmHost(): string {
        return this._bpmHost;
    }

    set bpmHost(bpmHostUrl: string) {
        this.bpmHostSubject.next(bpmHostUrl);
        this._bpmHost = bpmHostUrl;
    }

    getBPMApiBaseUrl(): string {
        return this._bpmHost + this._bpmContextPath;
    }

    getProviders(): string {
        return this.providers;
    }

    setProviders(providers: string) {
        this.providerSubject.next(providers);
        this.providers = providers;
    }
}
