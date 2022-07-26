import { createSelector } from "@ngrx/store";
import { ProductsState } from "../reducers";
import * as fromRoot from "../../../app/store";
import * as fromFeature from "../reducers";
import * as fromToppings from "../reducers/toppings.reducer";
import { Topping } from "../../models/topping.model";
import { getSelectedPizza } from "./pizzas.selectors";

export const getToppingsState = createSelector(
  fromFeature.getProductState,
  (state: fromFeature.ProductsState) => {
    console.log(state);
    return state.toppings;
  }
);

export const getToppingsEntities = createSelector(getToppingsState, fromToppings.getToppingsEntities);

export const getAllToppings = createSelector(getToppingsEntities, (entities: { [key: number]: Topping }) => {
  return Object.values(entities);
});

export const getSelectedToppings = createSelector(getToppingsState, fromToppings.getSelectedToppings);


export const getToppingsLoading = createSelector(getToppingsState, fromToppings.getToppingsLoading);
export const getToppingsLoaded = createSelector(getToppingsState, fromToppings.getToppingsLoaded);



