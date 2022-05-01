import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPipe } from './providers/company/company.pipe';
import { ActorsPipe } from './providers/actors/actors.pipe';
import { CompaniesPipe } from './providers/companies/companies.pipe';



@NgModule({
  declarations: [
    CompanyPipe,
    ActorsPipe,
    CompaniesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
