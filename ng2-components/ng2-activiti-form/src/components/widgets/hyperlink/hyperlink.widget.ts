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

import { Component } from '@angular/core';
import { WidgetComponent } from './../widget.component';

declare let __moduleName: string;
declare var componentHandler;

@Component({
    moduleId: __moduleName,
    selector: 'hyperlink-widget',
    templateUrl: './hyperlink.widget.html',
    styleUrls: ['./hyperlink.widget.css']
})
export class HyperlinkWidget extends WidgetComponent {

    static DEFAULT_URL: string = '#';
    static DEFAULT_URL_SCHEME: string = 'http://';

    get linkUrl(): string {
        let url = HyperlinkWidget.DEFAULT_URL;

        if (this.field && this.field.hyperlinkUrl) {
            url = this.field.hyperlinkUrl;
            if (!/^https?:\/\//i.test(url)) {
                url = HyperlinkWidget.DEFAULT_URL_SCHEME + url;
            }
        }

        return url;
    }

    get linkText(): string {
        if (this.field) {
            return this.field.displayText || this.field.hyperlinkUrl;
        }
        return null;
    }

}
