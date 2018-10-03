import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionSetListComponent, QuestionSetListService } from './question-set-list.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

const routes: Routes = [
  { path: '', component: QuestionSetListComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule,
    HttpClientModule
  ],
  declarations: [QuestionSetListComponent],
  providers: [QuestionSetListService]
})
export class QuestionSetListModule { }
