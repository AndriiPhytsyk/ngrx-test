import {Actions, Effect} from "@ngrx/effects";
import * as fromActions from '../actions';
import {catchError, map, switchMap} from "rxjs/operators";
import * as fromServices from '../../services'
import {of} from "rxjs/observable/of";
import {Injectable} from "@angular/core";
import { Topping } from "../../models/topping.model";

@Injectable()
export class ToppingsEffects {
  constructor(private actions$: Actions, private toppingsService: fromServices.ToppingsService) {
  }

  @Effect()
  loadPizza$ = this.actions$.ofType(fromActions.LOAD_TOPPINGS)
    .pipe(switchMap(() => {
      return this.toppingsService.getToppings().pipe(map((toppings: Topping[]) => new fromActions.LoadToppingsSuccess(toppings)),
        catchError((error) => of(new fromActions.LoadToppingsFail(error))))
    }))
}
