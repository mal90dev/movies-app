import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private basePath = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.basePath + '/companies');
  }

}
