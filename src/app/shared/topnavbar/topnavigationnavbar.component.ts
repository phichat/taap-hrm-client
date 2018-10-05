import { Component } from '@angular/core';
import { smoothlyMenu } from 'src/app/app.helpers';
declare var jQuery: any;

@Component({
  selector: 'topnavigationnavbar',
  templateUrl: 'topnavigationnavbar.template.html'
})
export class TopNavigationNavbarComponent {

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

}
