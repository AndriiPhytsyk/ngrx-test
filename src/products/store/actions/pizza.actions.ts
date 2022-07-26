import {Pizza} from "../../models/pizza.model";

export const LOAD_PIZZAS = '[Products] Load pizzas';
export const LOAD_PIZZAS_Fail = '[Products] Load pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load pizzas Success';
export const CREATE_PIZZA = "[Products] Create Pizza";
export const CREATE_PIZZA_SUCCESS = "[Products] Create Pizza Success";
export const CREATE_PIZZA_FAIL = "[Products] Create Pizza Fail";

export const DELETE_PIZZA = "[Products] Delete Pizza";
export const DELETE_PIZZA_SUCCESS = "[Products] Delete Pizza Success";
export const DELETE_PIZZA_FAIL = "[Products] Delete Pizza Fail";

export const UPDATE_PIZZA = "[Products] Update Pizza";
export const UPDATE_PIZZA_SUCCESS = "[Products] Update Pizza Success";
export const UPDATE_PIZZA_FAIL = "[Products] Update Pizza Fail";

export class LoadPizzas {
  readonly type = LOAD_PIZZAS;
}

export class CreatePizza {
  readonly type = CREATE_PIZZA;

  constructor(public payload: Pizza) {
  }
}

export class CreatePizzaSuccess {
  readonly type = CREATE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {
  }
}

export class CreatePizzaFail {
  readonly type = CREATE_PIZZA_FAIL;

  constructor(public payload: any) {
  }
}

//update

export class UpdatePizza {
  readonly type = UPDATE_PIZZA;

  constructor(public payload: Pizza) {
  }
}

export class UpdatePizzaSuccess {
  readonly type = UPDATE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {
  }
}

export class UpdatePizzaFail {
  readonly type = UPDATE_PIZZA_FAIL;

  constructor(public payload: any) {
  }
}

//delete

export class DeletePizza {
  readonly type = DELETE_PIZZA;

  constructor(public payload: Pizza) {
  }
}

export class DeletePizzaSuccess {
  readonly type = DELETE_PIZZA_SUCCESS;

  constructor(public payload: Pizza) {
  }
}

export class DeletePizzaFail {
  readonly type = DELETE_PIZZA_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadPizzasFail {
  readonly type = LOAD_PIZZAS_Fail;

  constructor(public payload: any) {
  }
}

export class LoadPizzasSuccess {
  readonly type = LOAD_PIZZAS_SUCCESS;

  constructor(public payload: Pizza[]) {
  }
}

export type PizzasAction = LoadPizzas | LoadPizzasFail | LoadPizzasSuccess | CreatePizza | CreatePizzaSuccess | CreatePizzaFail | UpdatePizza | UpdatePizzaSuccess | UpdatePizzaFail | DeletePizza | DeletePizzaSuccess | DeletePizzaFail;
