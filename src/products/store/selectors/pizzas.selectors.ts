import {createSelector} from "@ngrx/store";
import {ProductsState} from "../reducers";
import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers'
import * as fromPizzas from '../reducers/pizzas.reducers'
import * as fromToppings from "../selectors/toppings.selectors";
import {Pizza} from "../../models/pizza.model";

export const getPizzaState = createSelector(fromFeature.getProductState, (state: ProductsState) => state.pizzas);

export const getPizzaEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);

export const getSelectedPizza = createSelector(
  getPizzaEntities,
  fromRoot.getRouterReducer,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
)

export const getPizzaVisualize = createSelector(getSelectedPizza, fromToppings.getToppingsEntities, fromToppings.getSelectedToppings, (selectedPizza,entities, selectedToppings) => {
  const toppings = selectedToppings.map(id => entities[id]);
  console.log({...selectedPizza, toppings});
  return {...selectedPizza, toppings}
});

export const getAllPizzas = createSelector(getPizzaEntities, (entities) => {
  return Object.values(entities)
})

export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
