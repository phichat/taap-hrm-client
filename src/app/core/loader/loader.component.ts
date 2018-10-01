import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { LoaderState } from './loader-state';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

  show = false;

  private subscription: Subscription;

  constructor(
      private loaderService: LoaderService
  ) { }

  ngOnInit() { 
      this.subscription = this.loaderService.loaderState
          .subscribe((state: LoaderState) => {
              this.show = state.show;
          });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

}
