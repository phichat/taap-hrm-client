import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionListModel, QuestionModel } from '../models/question';
import { HttpService } from 'src/app/core/http.service';
import { apiConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  getQuestion(id: string) {
    const params = { id };
    const url = 'Question/GetQuestion'
    return this.httpService.get(url, { params });
  }

  getQuestionList(): Promise<QuestionListModel[]> {
    const url = `${apiConfig.apiUrl}/Question/GetQuestionList`;
    return this.http.get<QuestionListModel[]>(url).toPromise();
  }

  getQuestionSet(id: string) {
    const params = { id };
    const url = 'Question/GetQuestionSet'
    return this.httpService.get(url, { params });
  }

  createQuestion(form: any) {
    const params = form;
    const url = 'Question/CreateQuestion'
    return this.httpService.post(url, params);
  }

  updateQuestion(form: any) {
    const params = form;
    const url = 'Question/UpdateQuestion'
    return this.httpService.put(url, params);
  }

  updateQuestionSet(form: any) {
    // : Promise<boolean> {
    // const url = `${apiConfig.apiUrl}/Question/UpdateQuestionSet`;
    // const params = from;
    // return this.http.put<any>(url, params, this.httpOptions).toPromise();
    const params = form;
    const url = 'Question/UpdateQuestionSet'
    return this.httpService.put(url, params);
  }

  updateActiveQuestion(form: any) {
    // : Promise<boolean> {
    // const url = `${apiConfig.apiUrl}/Question/ActiveQuestion`;
    // const params = from;
    // return this.http.put<any>(url, params, this.httpOptions).toPromise();
    const params = form;
    const url = 'Question/ActiveQuestion'
    return this.httpService.put(url, params);
  }

  deleteChoice(id: string): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/Question/DeleteChoice`;
    const params = { id };
    return this.http.delete<any>(url, { params }).toPromise();
  }
}
