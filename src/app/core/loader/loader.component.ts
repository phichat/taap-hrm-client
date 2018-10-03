import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit, OnDestroy {

    show: any;

    private subscription: Subscription;

    constructor(
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe(state => {
                this.show = state;
            })
        //   .subscribe((state: LoaderState) => {
        //       this.show = state.show;
        //   });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}