import { combineReducers } from 'redux';

describe("Reducers", () => {

  describe('foundation', () => {

    it('reducers are functions', () => {
      const reducer = (state, action) => state;

      expect(solveme).toBeInstanceOf(Function);
    });

    it('reducers returns state if they have nothing to do', () => {
      const reducer = (state, action) => state;

      expect('some state').toBe(reducer('some state'));
    });

    it('reducers initializes state when undefined', () => {
      const reducer = (state = 'initial', action) => state;

      expect(solveme).toBe(reducer());
    });

    it('reducers applies received action', () => {
      const reducer = (state = 'initial', action) => {
        if (action.type === 'CHANGE_STATE') {
          return action.newState;
        }
        return state;
      };
      const action = {
        type: 'CHANGE_STATE', 
        newState: 'final',
      };

      expect(solveme).toBe(reducer(undefined, {}));
      expect(solveme).toBe(reducer('initial', {}));
      expect(solveme).toBe(reducer('initial', action));
    });

    it('reducers computes new state from previous', () => {
      const reducer = (state = 0, action) => {
        if (action.type === 'INCREMENT') {
          return state + 1;
        }
        return state;
      };
      const action = {
        type: 'INCREMENT', 
      };

      expect(solveme).toBe(reducer(undefined, {}));
      expect(solveme).toBe(reducer(0, {}));
      expect(solveme).toBe(reducer(0, action));
    });

    it('creates new objects for each possible value', () => {
      const reducer = (state = [], action) => {
        if (action.type === 'APPEND') {
          return [...state, action.value];
        }
        return state;
      };
      const action = {
        type: 'APPEND', 
        value: 1
      };

      expect(solveme).toEqual(reducer(undefined, {}));
      expect(solveme).toEqual(reducer([], {}));
      expect(solveme).toEqual(reducer([], action));
    });

    it('never changes the same object', () => {
      const reducer = (state = [], action) => {
        if (action.type === 'APPEND') {
          return [...state, action.value];
        }
        return state;
      };
      const action = {
        type: 'APPEND', 
        value: 1
      };

      const prevState = [];
      const nextState = reducer(prevState, action);

      expect(solveme).toEqual(prevState);
      expect(solveme).toEqual(nextState);
    });

    it('returns the same instance state if no action is executed', () => {
      const reducer = (state = [], action) => {
        if (action.type === 'APPEND') {
          return [...state, action.value];
        }
        return state;
      };

      const prevState = [];
      const nextState = reducer(prevState, {});

      expect(solveme).toBe(nextState);
    });

  });

  describe('combineReducers', () => {

    const name = (state = 'noname', action) => {
      if (action.type === 'SET_NAME') {
        return state = action.name;
      }
      return state;
    };

    const list = (state = [], action) => {
      if (action.type === 'APPEND') {
        return [...state, action.value];
      }
      return state;
    };

    const reducer = combineReducers({
      name,
      list,
    });

    it('combines both initial values into a single object with each reducers name as property key', () => {
      const state = reducer(undefined, {});
      expect(solveme).toMatchObject(state);
    });

    it('computes actions of all of its reducers [SET_NAME]', () => {
      const state = reducer(undefined, { type: 'SET_NAME', name: 'jack' });
      expect(solveme).toMatchObject(state);
    });

    it('computes actions of all of its reducers [APPEND]', () => {
      const state = reducer(undefined, { type: 'APPEND', value: 'barker' });
      expect(solveme).toMatchObject(state);
    });

  });


});
