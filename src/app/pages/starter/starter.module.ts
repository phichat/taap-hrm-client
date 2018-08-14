import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarterComponent } from './starter.component';
import { Routes, RouterModule } from '../../../../node_modules/@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StarterComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StarterComponent]
})
export class StarterModule { }
