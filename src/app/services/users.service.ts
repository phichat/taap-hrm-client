import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { apiConfig } from '../app.config';
import * as fromPubModel from '../models/users.model';
import { HttpService } from 'src/app/core/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements OnInit {

  private user = ['vt_id', 'vt_name_deposi', 'vt_type_user', 'vt_username'];

  private __user = [
    { name: 'vt_id', value: '	013d407166ec4fa56eb1e1f8cbe183b9' },
    { name: 'vt_name_deposi', value: '21232f297a57a5a743894a0e4a801fc3' },
    { name: 'vt_type_user', value: 'c4ca4238a0b923820dcc509a6f75849b' },
    { name: 'vt_username', value: '51de85e35100ada04ecc7bd01c47c8c6' }
  ];

  currentData = new BehaviorSubject<fromPubModel.UsersModel>(null);

  constructor(private http: HttpService) {
    // this.__user.map(async x => await this.setCookie(x.name, x.value));

    if (this.getCookie('vt_id')) {
      const id = this.getCookie('vt_id');
      const url = 'Users/GetUserById';
      const params = { id };
      this.http.get(url, { params }).subscribe(res => {
        const x: fromPubModel.UsersModel = res.json();
        this.currentData.next(x);
      });
    }
  }

  async ngOnInit() {
  }

  async signOut() {
    let cookie = await this.user.map(async x => await this.deleteCookie(x));
    this.currentData.next(null);
    Promise.all(cookie).then(() =>
      window.location.href = 'http://203.151.56.136/hrm/backoffice/backend/login.php'
    );
  }

  private deleteCookie(cname) {
    var d = new Date(); //Create an date object
    d.setTime(d.getTime() - (1000 * 60 * 60 * 24)); //Set the time to the past. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toUTCString(); //Compose the expirartion date
    window.document.cookie = cname + "=" + "; " + expires;//Set the cookie with name and the expiration date
  }

  private setCookie(cname, cvalue) {
    let d = new Date();
    d.setTime(d.getTime() + 60 * 60 * 24 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  private getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
