import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { CanActivate } from "@angular/router";
import * as fromStore from '../store';
import { Observable } from "rxjs/Observable";
import { catchError, filter, switchMap, take, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {
  }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getToppingsLoaded).pipe(
      tap((isLoaded: boolean) => {
        console.log(isLoaded);
        if(!isLoaded) {
          this.store.dispatch(new fromStore.LoadToppings());
        }
      }),
      filter(isLoaded => isLoaded),
      take(1)
    )
  }

}
