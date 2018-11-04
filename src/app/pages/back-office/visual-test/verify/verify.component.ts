import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerifyModel, ResultDetail } from './verify.model';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';
import { HttpService } from 'src/app/core/http.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {
  constructor(private httpService: HttpService) { }

  getQuestionResult(questionSetId: string, userId: string) {
    const params = { questionSetId, userId };
    return this.httpService.get('VerifyQuestion/GetQuestionResult', { params });
  }

  updateActiveTestResult(id: string, isActive: string) {
    const params = { id, isActive }
    return this.httpService.put('VerifyQuestion/ActiveTestResult', params);
  }

}
const updateUserPosi: number = 1;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private verifyService: VerifyService,
    private toastr: ToastrService,
    private chRef: ChangeDetectorRef
  ) { }
  dataTable: any;
  result = new VerifyModel();
  resultDetail = new Array<ResultDetail>();

  questionSetId: string;
  userId: string;

  ngOnInit() {
    this.activeRoute.params.subscribe(x => {
      this.questionSetId = x['questionSetId'];
      this.userId = x['userId'];
      this.verifyService.getQuestionResult(x['questionSetId'], x['userId']).subscribe(res => {
        const x: VerifyModel = res.json();
        this.result = x;
        this.resultDetail = x.resultDetail;
        this.onDetectDataTable();
      })
    })
  }

  onActiveResult(e: any, id: number, event: any) {
    const isActive = (e == 1 ? 0 : 1);
    const msg = isActive == 1 ? 'Set is Active' : 'Set is Deactive';

    this.verifyService
      .updateActiveTestResult(id.toString(), isActive.toString())
      .subscribe(() => {
        this.result.isActive = isActive;
        this.toastr.success(`${msg} complete!`, msg);

      }, (err: Response) => {
        event.target.checked = (e == 1 ? true : false);
        this.toastr.error(err.statusText, msg);
      });
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
