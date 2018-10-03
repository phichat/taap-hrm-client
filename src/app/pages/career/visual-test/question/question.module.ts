import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { QuestionService } from './question.service';
import { CountdownModule } from 'ngx-countdown';

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
    HttpClientModule,
    CountdownModule
  ],
  declarations: [
    QuestionComponent
  ],
  providers: [QuestionService]
})
export class QuestionModule { }
