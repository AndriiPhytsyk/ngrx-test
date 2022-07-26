import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { CanActivate } from "@angular/router";
import * as fromStore from '../store';
import { Observable } from "rxjs/Observable";
import { getPizzasLoaded, LoadPizzas } from "../store";
import { catchError, filter, switchMap, take, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class PizzaGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {
  }

  canActivate(): Observable<boolean> {
    return this.checkPizzas().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  private checkPizzas(): Observable<boolean> {
    return this.store.select(getPizzasLoaded).pipe(
      tap((isLoaded: boolean) => {
        if(!isLoaded) {
          this.store.dispatch(new LoadPizzas());
        }
      }),
      filter(isLoaded => isLoaded),
      take(1)
    )
  }

}
