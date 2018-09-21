import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiConfig } from '../../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
        {
            'Content-Type': 'application/json'
        })
};

  createQuestion(form: any): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/Question`;
    const params = form;
    const res = this.http.post<any>(url, params, this.httpOptions).toPromise();
    
    return res;
  }
}
