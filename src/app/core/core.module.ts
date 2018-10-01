import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../Core/loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { HttpService } from './http.service';
import { XHRBackend, RequestOptions } from '@angular/http';
import { httpServiceFactory } from '../_factory/http-service.factory';

@NgModule({
  imports: [
    CommonModule
  ], exports: [
    LoaderComponent
  ],
  declarations: [
    LoaderComponent
  ],
  providers: [
    LoaderService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoaderService]
    }
  ]
})
export class CoreModule { }
