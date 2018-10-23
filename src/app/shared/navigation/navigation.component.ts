import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import 'jquery-slimscroll';
// import { UserService } from '../../../services/user/user.service';
// import { ModelUser } from '../../../models/user/user';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

declare var jQuery: any;

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html'
})

export class NavigationComponent implements OnInit, AfterViewInit, OnDestroy {

    // modelUser: ModelUser;
    params: Observable<Params>;
    private _onDestroy = new Subject<void>();
    externalUrl = 'http://203.151.56.136/hrm/backoffice/backend/';

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private location: Location,
        // private _userService: UserService
        ) {
        // this._userService.currentUser.subscribe(p => {
        //     this.modelUser = p;
        // });
    }

    ngOnInit() {
        // Combine params from all of the path into a single object.
        // this.params = combineLatest(
        //     this._activatedRoute.pathFromRoot.map(route => route.params), Object.assign
        // );

        // this._router.events.pipe(
        //     startWith(null),
        //     switchMap(() => this.params),
        //     takeUntil(this._onDestroy)
        //   ).subscribe(p => console.log(p));   

        // this._router.events
        //     .filter((event) => event instanceof NavigationEnd)
        //     .map(() => this._activatedRoute)
        //     .map((route) => {
        //         while (route.firstChild) route = route.firstChild;
        //         return route;
        //     })
        //     .filter((route) => route.outlet === 'primary')
        //     .mergeMap((route) => route.data)
        //     .subscribe((event) => console.log(event));

        // this._router.events
        //     .subscribe((event) => {
        //         if (event instanceof NavigationEnd) {
        //             console.log('NavigationEnd:', event);
        //         }
        //     });
        const part = this.location.path().split('/')[1];
        // this.setExpansions(part);
    }

    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();

        if (jQuery("body").hasClass('fixed-sidebar')) {
            jQuery('.sidebar-collapse').slimscroll({
                height: '100%'
            })
        }
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }


    /** Set the expansions based on the route url */
    setExpansions(params: Params) {
        // for (const category of categories) {
        //     //   if (this.expansions[category.id] === true) {
        //     //     continue;
        //     //   }

        //     let match = false;
        //     for (const item of category.items) {
        //         if (this._router.url.indexOf(item.id) > -1) {
        //             match = true;
        //             break;
        //         }
        //     }
        //     //   this.expansions[category.id] = match;
        // }
    }

    activeRoute(routename: string): boolean {
        return this._router.url.indexOf(routename) > -1;
    }

    signOut() {
        localStorage.removeItem('currentUser');
        this._router.navigate(['login']);
    }
}
