import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { smoothlyMenu } from 'src/app/app.helpers';

declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  constructor(private router: Router){
    
  }

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }

  signOut(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

}
