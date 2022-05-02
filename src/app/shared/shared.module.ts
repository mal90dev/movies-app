import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './modules/material/material.module';
import { RouterModule } from '@angular/router';
import { ActorPipe } from './pipes/actor.pipe';
import { CompanyPipe } from './pipes/company.pipe';
import { TranslateModule } from '@ngx-translate/core';

const pipes = [
  ActorPipe,
  CompanyPipe
]

@NgModule({
  declarations: [
    NavbarComponent,
    ...pipes
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [
    NavbarComponent,
    ...pipes
  ]
})
export class SharedModule { }
