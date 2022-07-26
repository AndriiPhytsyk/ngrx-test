import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { getPizzasLoaded, LoadPizzas } from "../store";
import { filter, map, switchMap, take, tap } from "rxjs/operators";
import * as fromStore from '../store';
import { Store } from "@ngrx/store";

@Injectable()
export class PizzaExistGuard implements CanActivate{

  constructor(private store: Store<fromStore.ProductsState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(switchMap(()=> {
      const id = parseInt(route.params.pizzaId, 10);
      console.log(id);
      console.log(this.hasPizza(id));
      return this.hasPizza(id);
    }))
  }

  private hasPizza(id: number): Observable<boolean> {
    return this.store.select(fromStore.getPizzaEntities)
      .pipe(
        map((entities) => {
          console.log(id);
          console.log(entities);
          return !!entities[id];
        }),
        take(1)
      )
  }

  private checkStore(): Observable<boolean> {
    return this.store.select(getPizzasLoaded).pipe(
      tap((isLoaded: boolean) => {
        console.log(isLoaded);
        if(!isLoaded) {
          this.store.dispatch(new LoadPizzas());
        }
      }),
      filter(isLoaded => isLoaded),
      take(1)
    )
  }
}
