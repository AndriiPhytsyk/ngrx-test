import { Pizza } from "../../models/pizza.model";
import * as fromPizzas from "../actions/pizza.actions";
import {
  CREATE_PIZZA,
  CREATE_PIZZA_FAIL,
  CREATE_PIZZA_SUCCESS, DELETE_PIZZA, DELETE_PIZZA_FAIL, DELETE_PIZZA_SUCCESS, UPDATE_PIZZA,
  UPDATE_PIZZA_FAIL,
  UPDATE_PIZZA_SUCCESS
} from "../actions/pizza.actions";
import { LOAD_PIZZAS, LOAD_PIZZAS_Fail, LOAD_PIZZAS_SUCCESS } from "../actions";

export interface PizzaState {
  entities: { [id: number]: Pizza },
  loading: boolean,
  loaded: boolean

}

export const initialState: PizzaState = {
  entities: {},
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction): PizzaState {
  switch (action.type) {
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }

    case LOAD_PIZZAS_SUCCESS: {
      const pizzas: Pizza[] = action.payload;

      const entities = pizzas.reduce((entities: { [id: number]: Pizza }, pizza: Pizza) => {
        return { ...entities, [pizza.id]: pizza };
      }, {});
      console.log(entities);
      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }

    case LOAD_PIZZAS_Fail: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case CREATE_PIZZA: {
      return {
        ...state,
      };
    }

    case CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      return {
        ...state,
        entities: { ...state.entities, [pizza.id]: pizza },
      };
    }

    case CREATE_PIZZA_FAIL: {
      return {
        ...state,
      };
    }

    //update

    case UPDATE_PIZZA: {
      return {
        ...state,
      };
    }

    case UPDATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {...state.entities, [pizza.id]: pizza};
      return {
        ...state,
        entities,
      };
    }

    case UPDATE_PIZZA_FAIL: {
      return {
        ...state,
      };
    }

    //delete

    case DELETE_PIZZA: {
      return {
        ...state,
      };
    }

    case DELETE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const {[pizza.id]: removed, ...entities} = state.entities;
      return {
        ...state,
        entities
      };
    }

    case DELETE_PIZZA_FAIL: {
      return {
        ...state
      };
    }
  }
  return state;

}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzasEntities = (state: PizzaState) => state.entities;


