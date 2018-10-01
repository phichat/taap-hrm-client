import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { HeaderNavigationComponent } from './shared/header-navigation/header-navigation.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { routes } from './app.routing';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderNavigationComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    // CoreModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
