import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from 'src/app/core/http.service';
import { apiConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

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

  getQuestionRandom(id: string) {
    const url = 'Question/GetQuestionRandom'
    const params = { id };
    return this.httpService.get(url, { params })
  }

  verifyQuestion(form: any) {
    const url = 'VerifyQuestion/CreateVerifyQuestion';
    const params = form;
    return this.httpService.post(url, params)
  }
}
