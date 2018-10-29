import { Component } from '@angular/core';
import * as fromPubService from 'src/app/services';
import { smoothlyMenu } from 'src/app/app.helpers';

declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  constructor(private s_users: fromPubService.UsersService){
    
  }

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  signOut(){
    this.s_users.signOut();
  }

}
