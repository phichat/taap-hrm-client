import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyModel, ResultDetail } from './verify.model';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';
import { HttpService } from 'src/app/core/http.service';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  constructor(private httpService: HttpService) { }

  getQuestionResult(questionSetId: string, userId: string) {
    // : Promise<any> {
    // const url = `${apiConfig.apiUrl}/VerifyQuestion/GetQuestionResult`;
    // const params = { questionSetId, userId };
    // return this.http.get<any>(url, { params }).toPromise();
    const params = { questionSetId, userId };
    return this.httpService.get('VerifyQuestion/GetQuestionResult', { params });
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
    private verifyService: VerifyService,
    private chRef: ChangeDetectorRef
  ) { }
  dataTable: any;
  result = new VerifyModel();
  resultDetail = new Array<ResultDetail>();

  ngOnInit() {
    this.activeRoute.params.subscribe(x => {
      this.verifyService.getQuestionResult(x['questionSetId'], x['userId']).subscribe(res => {
        const x: VerifyModel = res.json();
        this.result = x;
        this.resultDetail = x.resultDetail;
        this.onDetectDataTable();
      })
    })
  }

  onDetectDataTable() {

    const table: any = $('table');

    if ($.fn.DataTable.isDataTable('table')) {
      this.dataTable = table.DataTable();
      this.dataTable.destroy();
    }
    this.chRef.detectChanges();

    this.dataTable = $('table').DataTable({
      'scrollY': true,
      'searching': false
    });
  }

}
