import { Component, OnInit } from '@angular/core';
import { QuestionListService } from './question-list.service';
// import { QuestionListModel } from './question-list.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  // QuestionList = new Array<QuestionListModel>();

  constructor(private questionListService: QuestionListService) { }

  ngOnInit() {
    // this.questionListService.getQuestionList().then(x => this.QuestionList = x);
  }

}
