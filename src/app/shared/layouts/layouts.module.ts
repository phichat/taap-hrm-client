import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { BasicLayoutComponent } from "./basicLayout.component";
import { BlankLayoutComponent } from "./blankLayout.component";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { FooterComponent } from "../footer/footer.component";
import { NavigationComponent } from "../navigation/navigation.component";
import { TopNavbarComponent } from "../topnavbar/topnavbar.component";
import { TopNavigationNavbarComponent } from "../topnavbar/topnavigationnavbar.component";


@NgModule({
  declarations: [
    BreadcrumbComponent,
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
})

export class LayoutsModule { }
