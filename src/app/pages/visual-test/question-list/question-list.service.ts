import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { QuestionListModel } from './question-list.model';
import { apiConfig } from '../../../app.config';

@Injectable({
  providedIn: 'root'
})
export class QuestionListService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  getQuestionList(): Promise<QuestionListModel[]> {
    const url = `${apiConfig.apiUrl}/Question/QuestionList`;
    return this.http.get<QuestionListModel[]>(url).toPromise();
  }
}
