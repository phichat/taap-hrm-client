import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionSetListModel } from './question-set-list.model';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/core/http.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs';

@Injectable({
  providedIn: 'root'
})
export class QuestionSetListService {
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

  getListQuestionSet() {
    const url = 'Question/GetListQuestionSet'
    return this.httpService.get(url);
  }

  updateActionQuestionSet(form: any) {
    const url = 'Question/ActiveQuestionSet';
    const params = form;
    return this.httpService.put(url, params)
  }

}


const updateUserPosi: number = 1;
@Component({
  selector: 'app-question-set-list',
  templateUrl: './question-set-list.component.html',
  styleUrls: ['./question-set-list.component.scss']
})
export class QuestionSetListComponent implements OnInit {

  constructor(
    private qsListService: QuestionSetListService,
    private toastr: ToastrService,
    private chRef: ChangeDetectorRef
  ) { }

  dataTable: any;

  questionSetList = new Array<QuestionSetListModel>();

  ngOnInit() {
    this.qsListService.getListQuestionSet().subscribe(res => {
      this.questionSetList = res.json();
      this.onDetectDataTable();
    })
  }

  onActiveQuestionSet(e: any, i: number, id: number, event: any) {
    const isActive = (e == 1 ? 0 : 1);
    const msg = isActive == 1 ? 'Set is Active' : 'Set is Deactive';
    const from = {
      id,
      isActive,
      updateUserPosi
    }

    this.qsListService.updateActionQuestionSet(from).subscribe(() => {
      this.questionSetList
        .filter((x, index) => index == i)
        .map(x => x.isActive = isActive);

      this.toastr.success(`${msg} complete!`, msg);

    }, (err: Response) => {
      event.target.checked = (e == 1 ? true : false);
      this.toastr.error(err.statusText, msg);
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
      'scrollY': true
    });
  }

}
