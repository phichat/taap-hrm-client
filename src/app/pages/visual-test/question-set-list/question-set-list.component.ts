import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { QuestionSetListModel } from './question-set-list.model';
import { apiConfig } from '../../../app.config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class QuestionSetListService {
  constructor(
    private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  getListQuestionSet(): Promise<QuestionSetListModel[]> {
    const url = `${apiConfig.apiUrl}/Question/GetListQuestionSet`;
    return this.http.get<any>(url).toPromise();
  }

  updateActionQuestionSet(from: any): Promise<boolean> {
    const url = `${apiConfig.apiUrl}/Question/ActiveQuestionSet`;
    const params = from;
    return this.http.put<any>(url, params, this.httpOptions).toPromise();
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
    private router: Router,
		private toastr: ToastrService
    ) { }

  questionSetList = new Array<QuestionSetListModel>();

  ngOnInit() {
    this.qsListService.getListQuestionSet().then(x => this.questionSetList = x);
  }

  onActiveQuestionSet(e: any, i: number, id: number, event: any) {
		const isActive = (e == 1 ? 0 : 1);
		const msg = isActive == 1 ? 'Set is Active' : 'Set is Deactive';
		const from = {
			id,
			isActive,
			updateUserPosi
		}

		this.qsListService.updateActionQuestionSet(from).then(x => {
			this.questionSetList
				.filter((x, index) => index == i)
				.map(x => x.isActive = isActive);

			this.toastr.success(`${msg} complete!`, msg);

		}, (err: HttpErrorResponse) => {
			event.target.checked = (e == 1 ? true : false);
			this.toastr.error(err.message, msg);
		})
  }
  
  onEditQuestionSet(id: number) {
    this.router.navigate(['/career/visual-test/manage', 'R', id])
  }

}
