import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ListUserComponent } from "./components/list-user/list-user.component";

import { NzButtonModule } from "ng-zorro-antd/button";
import { NzSelectModule } from "ng-zorro-antd/select";

const EXPORTS = [ListUserComponent];

@NgModule({
  declarations: [ProfileComponent, ...EXPORTS],
  imports: [CommonModule, 
    ProfileRoutingModule, 
    NzButtonModule,
    NzSelectModule,
  ],
  exports: [...EXPORTS]
})
export class ProfileModule {
  static exports = EXPORTS; // prevents from components being tree-shaked in production
}
