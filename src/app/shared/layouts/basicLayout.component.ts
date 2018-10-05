import { Component, OnInit } from '@angular/core';
import { detectBody } from 'src/app/app.helpers';

declare var jQuery: any;

@Component({
    selector: 'basic',
    templateUrl: 'basicLayout.template.html',
    host: {
        '(window:resize)': 'onResize()'
    }
})
export class BasicLayoutComponent implements OnInit {

    onLoadWarpper: boolean;
    constructor() {
    }

    ngOnInit(): any {
        detectBody();


    }
    public onResize() {
        detectBody();
    }

}
