import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { FederatedComponent } from './components/federated/federated.component';
import { TbAnchorComponent } from "./components/tb-anchor.component";
import { MicrofrontendService } from './microfrontends/microfrontend.service';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from "ng-zorro-antd/message";

registerLocaleData(zh);

export function initializeApp(mfService: MicrofrontendService): () => Promise<void> {
  return () => mfService.initialise();
}

@NgModule({
  declarations: [AppComponent, HomeComponent, FederatedComponent, TbAnchorComponent],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' }), 
    FormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    NzModalModule,
    NzButtonModule,
    NzMessageModule,
  ],
  providers: [
    MicrofrontendService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [MicrofrontendService],
    },
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
