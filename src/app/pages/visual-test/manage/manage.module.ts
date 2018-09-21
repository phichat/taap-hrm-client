import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ManageService } from './manage.service';

const routes: Routes = [
  { path: '', component: ManageComponent }
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
  declarations: [ManageComponent],
  providers: [ManageService]
})
export class ManageModule { }
