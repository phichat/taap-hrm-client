import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { Routes, RouterModule } from '../../../../../node_modules/@angular/router';
import { FormsModule, ReactiveFormsModule } from '../../../../../node_modules/@angular/forms';

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
    ReactiveFormsModule
  ],
  declarations: [QuestionComponent]
})
export class QuestionModule { }
