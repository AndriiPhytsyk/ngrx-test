import { Actions, Effect } from "@ngrx/effects";
import * as fromActions from "../actions";
import { catchError, map, switchMap } from "rxjs/operators";
import * as fromServices from "../../services";
import * as fromRoot from '../../../app/store'
import { of } from "rxjs/observable/of";
import { Injectable } from "@angular/core";
import { Pizza } from "../../models/pizza.model";

@Injectable()
export class PizzasEffects {
  constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {
  }

  @Effect()
  loadPizza$ = this.actions$.ofType(fromActions.LOAD_PIZZAS)
    .pipe(switchMap(() => {
      return this.pizzaService.getPizzas().pipe(map((pizzas) => new fromActions.LoadPizzasSuccess(pizzas)),
        catchError((error) => of(new fromActions.LoadPizzasFail(error))));
    }));

  @Effect()
  updatePizza$ = this.actions$.ofType(fromActions.UPDATE_PIZZA)
    .pipe(
      map((action: fromActions.UpdatePizza) => action.payload),
      switchMap((pizza: Pizza) => {
        console.log(pizza);
        return this.pizzaService.updatePizza(pizza)
          .pipe(map(() => {
            console.log("created pizza");
            return new fromActions.UpdatePizzaSuccess(pizza);
          }), catchError((error) => {
            return of(new fromActions.UpdatePizza(error));
          }));
      }))

  @Effect()
  deletePizza$ = this.actions$.ofType(fromActions.DELETE_PIZZA)
    .pipe(
      map((action: fromActions.DeletePizza) => action.payload),
      switchMap((pizza: Pizza) => {
        return this.pizzaService.removePizza(pizza)
          .pipe(map(() => {
            return new fromActions.DeletePizzaSuccess(pizza);
          }), catchError((error) => {
            return of(new fromActions.DeletePizzaFail(error));
          }));
      }))


  @Effect()
  createPizza$ = this.actions$.ofType(fromActions.CREATE_PIZZA)
    .pipe(
      map((action: fromActions.CreatePizza) => action.payload),
      switchMap((pizza: Pizza) => {
        console.log(pizza);
        return this.pizzaService.createPizza(pizza)
          .pipe(map((p) => {
            console.log(p);
            return new fromActions.CreatePizzaSuccess(p);
          }), catchError((error) => {
            return of(new fromActions.LoadPizzasFail(error));
          }));
      }));

  @Effect()
  createPizzaSuccess$ = this.actions$.ofType(fromActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: fromActions.CreatePizzaSuccess) => action.payload),
      map((pizza:Pizza ) => {
        console.log("here");
        console.log(pizza);
        return new fromRoot.Go({
          path: ['/products', pizza.id]
        })
      })
    )

  @Effect()
  handlePizzaSuccess$ = this.actions$.ofType(fromActions.DELETE_PIZZA_SUCCESS, fromActions.UPDATE_PIZZA_SUCCESS)
    .pipe(
      map(() => {
        return new fromRoot.Go({
          path: ['/products']
        })
      })
    )


}
