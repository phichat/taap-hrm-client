import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiConfig } from '../../../app.config';
import { QuestionSetRandom } from '../models/question';
import { HttpService } from '../../../core/http.service';
import { map } from 'rxjs/operators';

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
    // const url = `${apiConfig.apiUrl}/Question/GetQuestionRandom`;
    // const params = { id };
    // return this.http.get<any>(url, { params }).toPromise();
    const url = 'Question/GetQuestionRandom'
    const params = { id };
    return this.httpService.get(url, { params })
  }

  verifyQuestion(form: any): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/VerifyQuestion/CreateVerifyQuestion`;
    const params = form;
    return this.http.post<any>(url, params, this.httpOptions).toPromise();
  }
}
