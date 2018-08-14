import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: VerifyComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [VerifyComponent]
})
export class VerifyModule { }
