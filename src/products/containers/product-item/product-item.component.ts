import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { Pizza } from '../../models/pizza.model';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import * as fromStore from '../../store';

import { Topping } from '../../models/topping.model';
import { tap } from "rxjs/operators";

@Component({
  selector: 'product-item',
  styleUrls: ['product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(tap((pizza: Pizza) => {
      const isPizzaExist = !!(pizza && pizza.toppings)
      const toppings = isPizzaExist ? pizza.toppings.map(topping => topping.id) : [];
      this.store.dispatch(new fromStore.SelectedToppings(toppings));
    }));
    this.toppings$ = this.store.select(fromStore.getAllToppings);
    this.visualise$ = this.store.select(fromStore.getPizzaVisualize);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.SelectedToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.DeletePizza(event))
    }
  }
}
