import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../../core/models/company';

@Pipe({
  name: 'pipeCompany'
})
export class CompanyPipe implements PipeTransform {

  transform(id: number, listCompanies: Company[]): string {
    let companyName = '';
    listCompanies.find( (company: Company) => {
      if( company.id === id ) {
        companyName = company.name;
      }
    });
    return companyName;
  }

}
