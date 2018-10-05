import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html'
})

export class BreadcrumbComponent implements OnInit {
    pageInfo;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title
    ) { }

    ngOnInit() {
          this.activatedRoute.url.subscribe(() => {
            this.pageInfo = this.activatedRoute.snapshot.firstChild.data;
        });
        // console.log(this.activatedRoute.snapshot.data['title']);
    }

}
