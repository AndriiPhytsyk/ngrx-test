import * as fromToppings from './topping.actions';
import { SELECTED_TOPPINGS } from "./topping.actions";

describe('Toppings Actions', () => {
  describe('LoadToppings Actions', () => {
    describe('LoadToppings', () => {
      it('should create an action', () => {
        const action = new fromToppings.LoadToppings();
        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS,
        });
      });
    });

    describe('LoadToppingsFail', () => {
      it('should create an action', () => {
        const payload = { message: 'Load Error' };
        const action = new fromToppings.LoadToppingsFail(payload);

        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS_FAIL,
          payload,
        });
      });
    });

    describe('LoadToppingsSuccess', () => {
      it('should create an action', () => {
        const payload = [
          { id: 1, name: 'onion' },
          { id: 2, name: 'mushroom' },
          { id: 3, name: 'basil' },
        ];
        const action = new fromToppings.LoadToppingsSuccess(payload);

        expect({ ...action }).toEqual({
          type: fromToppings.LOAD_TOPPINGS_SUCCESS,
          payload,
        });
      });
    });
  });

  describe('VisualiseToppings Actions', () => {
    describe('VisualiseToppings', () => {
      it('should create an action', () => {
        const action = new fromToppings.SelectedToppings([1, 2, 3]);
        expect({ ...action }).toEqual({
          type: fromToppings.SELECTED_TOPPINGS,
          payload: [1, 2, 3],
        });
      });
    });
  });
});
