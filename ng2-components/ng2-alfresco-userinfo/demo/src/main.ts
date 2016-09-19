
import { Component, OnInit } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { UserInfoComponent } from 'ng2-alfresco-userinfo';
import { HTTP_PROVIDERS } from '@angular/http';
import {
    AlfrescoSettingsService,
    AlfrescoAuthenticationService,
    ALFRESCO_CORE_PROVIDERS
} from 'ng2-alfresco-core';

@Component({
  selector: 'my-app',
  template: `<h4>START</h4><ng2-alfresco-userinfo [userEmail]="'test'"></ng2-alfresco-userinfo>`,
  directives: [ UserInfoComponent ],
  providers: [AlfrescoAuthenticationService, AlfrescoSettingsService]
})


class UserInfoDemo implements OnInit {

      private authenticated: boolean;
      private token: any;

      constructor(private authService: AlfrescoAuthenticationService,
                  private settingsService: AlfrescoSettingsService) {
            this.settingsService.setProviders('ALL');
      }

      public ngOnInit(): void {
          this.login();
      }

    login() {
        this.authService.login('test', 'test').subscribe(
            token => {
                console.log(token);
                this.token = token;
                this.authenticated = true;
            },
            error => {
                console.log(error);
                this.authenticated = false;
            });
    }
}

bootstrap(UserInfoDemo, [
  UserInfoComponent,
  HTTP_PROVIDERS,
  ALFRESCO_CORE_PROVIDERS
]);
