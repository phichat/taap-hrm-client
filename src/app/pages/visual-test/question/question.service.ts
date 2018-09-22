import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiConfig } from '../../../app.config';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  getQuestionRandom(): Promise<any> {
    const url = `${apiConfig.apiUrl}/Question/QuestionRandom`;
    return this.http.get<any>(url).toPromise();
  }
}
