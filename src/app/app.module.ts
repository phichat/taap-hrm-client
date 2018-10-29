import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderNavigationComponent } from './shared/header-navigation/header-navigation.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { routes } from './app.routing';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { HttpModule } from '@angular/http';
import { LayoutsModule } from './shared/layouts/layouts.module';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavigationComponent
  ],
  imports: [
    CommonModule, 
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CoreModule,
    HttpModule,
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true
    }),
    LayoutsModule
  ],
  providers: [
    { 
      provide: LocationStrategy, 
      useClass: HashLocationStrategy 
    },
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
