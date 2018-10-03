import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent, VerifyService } from './verify.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

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
    HttpModule,
    HttpClientModule
  ],
  declarations: [VerifyComponent],
  providers: [VerifyService]
})
export class VerifyModule { }
