import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../../../app.config';
import { VerifyModel } from './verify.model';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  constructor(private http: HttpClient) { }

  getQuestionResult(questionSetId: string, userId: string): Promise<any> {
    const url = `${apiConfig.apiUrl}/VerifyQuestion/GetQuestionResult`;
    const params = { questionSetId, userId };
    return this.http.get<any>(url, { params }).toPromise();
  }
}

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private verifyService: VerifyService
  ) { }

  result: VerifyModel;

  ngOnInit() {
    this.activeRoute.params.subscribe(x => {
      this.verifyService.getQuestionResult(x['questionSetId'], x['userId']).then(x => {
        this.result = x;
      })
    })
  }

}
