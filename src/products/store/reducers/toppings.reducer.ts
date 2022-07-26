import { Pizza } from "../../models/pizza.model";
import * as fromTopping from "../actions/topping.actions";
import { LOAD_TOPPINGS_FAIL, SELECTED_TOPPINGS , LOAD_TOPPINGS, LOAD_TOPPINGS_SUCCESS} from "../actions";
import { Topping } from "../../models/topping.model";

export interface ToppingState {
  entities: {[id: number]: Topping},
  selectedToppings: number[];
  loading: boolean,
  loaded: boolean

}

export const initialState: ToppingState = {
  entities: {},
  selectedToppings: [],
  loading: false,
  loaded: false
}

export function reducer(state = initialState, action: fromTopping.ToppingsAction): ToppingState {
  switch (action.type) {
    case LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true,
        loaded: false
      }
    }

    case LOAD_TOPPINGS_SUCCESS: {
      console.log(state);
      const pizzas: Pizza[] = action.payload;

      const entities = pizzas.reduce((entities: {[id: number]: Pizza}, pizza: Pizza)=> {
        return {...entities, [pizza.id]: pizza}
      }, {})
      console.log(entities);
      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      }
    }

    case LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      }
    }

    case SELECTED_TOPPINGS: {
      console.log(action.payload);
      return {
        ...state,
        selectedToppings: action.payload
      }
    }
  }

  return state;
}

export const getToppingsLoading = (state: ToppingState) => state.loading;
export const getToppingsLoaded = (state: ToppingState) => state.loaded;
export const getToppingsEntities = (state: ToppingState) => state.entities;
export const getSelectedToppings = (state: ToppingState) => state.selectedToppings


