import { PizzaGuard } from "./pizza.guard";
import { PizzaExistGuard } from "./pizza-exist.guard";
import { ToppingsGuard } from "./toppings.guard";

export const guards: any[] = [PizzaGuard, PizzaExistGuard, ToppingsGuard];

export * from './pizza.guard';
export * from './pizza-exist.guard';
export * from './toppings.guard';
