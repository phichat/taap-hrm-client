import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { Routes, RouterModule } from '../../../../../node_modules/@angular/router';
import { FormsModule, ReactiveFormsModule } from '../../../../../node_modules/@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { QuestionService } from './question.service';

const routes: Routes = [
  {
    path: '',
    component: QuestionComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [
    QuestionComponent
  ],
  providers: [QuestionService]
})
export class QuestionModule { }
