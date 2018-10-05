import { Component, OnInit} from '@angular/core';
import { detectBody } from 'src/app/app.helpers';

declare var jQuery: any;

@Component({
    selector: 'blank',
    templateUrl: 'blankLayout.template.html',
    host: {
        '(window:resize)': 'onResize()'
    }
})
export class BlankLayoutComponent implements OnInit {

    constructor() {}

    ngOnInit(): any {
        detectBody();


    }
    public onResize() {
        detectBody();
    }
}
