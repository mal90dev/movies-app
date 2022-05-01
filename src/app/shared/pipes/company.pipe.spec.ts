import { Company } from '../../core/models/company';
import { CompanyPipe } from './company.pipe';

describe('CompanyPipe', () => {

  const listCompanies: Company[] = [
    { 
      id: 1, 
      name: 'Company 1',
      country: "China",
      createYear: 2005,
      employees: 611,
      rating: 8.19,
      movies: [2, 3, 4]
    },
    { 
      id: 2, 
      name: 'Company 2',
      country: "China",
      createYear: 2005,
      employees: 611,
      rating: 8.19,
      movies: [2, 3, 4]
    },
  ];

  it('create an instance', () => {
    const pipe = new CompanyPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return company name', () => {
    const pipe = new CompanyPipe();
    expect(pipe.transform(1, listCompanies)).toEqual('Company 1');
  });

  it('should return empty string', () => {
    const pipe = new CompanyPipe();
    expect(pipe.transform(4, listCompanies)).toEqual('desconocido');
  });

});
