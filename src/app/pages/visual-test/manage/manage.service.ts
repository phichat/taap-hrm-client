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

  getQuestionById(id: string): Promise<any> {
    const url = `${apiConfig.apiUrl}/Question`;
    const params = { id };
    return this.http.get<any>(url, { params }).toPromise();
  }

  createQuestion(form: any): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/Question`;
    const params = form;
    return this.http.post<any>(url, params, this.httpOptions).toPromise();
  }

  updateQuestion(id: string, form: any): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/Question/${id}`;
    const params = form;
    return this.http.put<any>(url, params, this.httpOptions).toPromise();
  }
}
