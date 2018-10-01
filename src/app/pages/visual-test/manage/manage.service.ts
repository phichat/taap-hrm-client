import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiConfig } from '../../../app.config';
import { QuestionListModel, QuestionSet, QuestionSetModel, QuestionModel } from '../models/question';

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

  getQuestion(id: string): Promise<any> {
    const url = `${apiConfig.apiUrl}/Question/GetQuestion`;
    const params = { id };
    return this.http.get<any>(url, { params }).toPromise();
  }

  getQuestionList(): Promise<QuestionListModel[]> {
    const url = `${apiConfig.apiUrl}/Question/GetQuestionList`;
    return this.http.get<QuestionListModel[]>(url).toPromise();
  }

  getQuestionSet(id: string): Promise<QuestionSetModel> {
    const url = `${apiConfig.apiUrl}/Question/GetQuestionSet`;
    const params = { id };
    return this.http.get<QuestionSetModel>(url, { params }).toPromise();
  }

  createQuestion(form: any): Promise<QuestionModel> {
    const url = `${apiConfig.apiUrl}/Question/CreateQuestion`;
    const params = form;
    return this.http.post<any>(url, params, this.httpOptions).toPromise();
  }

  updateQuestion(form: any): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/Question/UpdateQuestion`;
    const params = form;
    return this.http.put<any>(url, params, this.httpOptions).toPromise();
  }

  updateQuestionSet(from: any): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/Question/UpdateQuestionSet`;
    const params = from;
    return this.http.put<any>(url, params, this.httpOptions).toPromise();
  }

  updateActiveQuestion(from: any): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/Question/ActiveQuestion`;
    const params = from;
    return this.http.put<any>(url, params, this.httpOptions).toPromise();
  }

  deleteChoice(id: string): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/Question/DeleteChoice`;
    const params = { id };
    return this.http.delete<any>(url, { params }).toPromise();
  }
}
