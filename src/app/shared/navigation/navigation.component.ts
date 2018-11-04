import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, Params } from '@angular/router';
import 'jquery-slimscroll';
import { Observable } from 'rxjs/internal/Observable';
import * as fromPubService from 'src/app/services';
import { UsersModel } from 'src/app/models';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { apiConfig } from 'src/app/app.config';

declare var jQuery: any;

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html'
})

export class NavigationComponent implements OnInit, AfterViewInit {

    // modelUser: ModelUser;
    params: Observable<Params>;
    asyncUser: BehaviorSubject<UsersModel>;
    externalUrl = `${apiConfig.apiExternal}/`;

    user = new UsersModel();

    constructor(
        private _router: Router,
        private s_users: fromPubService.UsersService,
        private cd: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.asyncUser = this.s_users.currentData;
        this.asyncUser.subscribe(x => {
            this.user = x;
        })
    }

    refresh() {
        this.cd.detectChanges();
    }

    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();

        if (jQuery("body").hasClass('fixed-sidebar')) {
            jQuery('.sidebar-collapse').slimscroll({
                height: '100%'
            })
        }
    }

    /** Set the expansions based on the route url */
    setExpansions(params: Params) {
    }

    activeRoute(routename: string): boolean {
        return this._router.url.indexOf(routename) > -1;
    }

    signOut() {
        this.s_users.signOut();
    }
}
