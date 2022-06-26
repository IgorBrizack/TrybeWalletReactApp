// Coloque aqui suas actions

export const LOG_IN_SUCCES = 'LOG_IN_SUCCES';
export const FETCH_DATA_COINS_SUCCESS = 'FETCH_DATA_COINS_SUCCESS';
export const FETCH_DATA_COINS_ERROR = 'FETCH_DATA_COINS_ERROR';
export const FETCH_VALUE_COINS_SUCCESS = 'FETCH_VALUE_COINS_SUCCES';
export const TOTAL_EXPENSES_DONE = 'TOTAL_EXPENSES_DONE';
export const EXCLUDED_ITEM_DONE = 'EXCLUDED_ITEM_DONE';
export const EDIT_ITEM_TRUE = 'EDIT_ITEM_TRUE';
export const EDIT_ITEM_FALSE = 'EDIT_ITEM_FALSE';

export function logInSucces(userData) {
  return {
    type: LOG_IN_SUCCES,
    payload: {
      email: userData.email,
    },
  };
}

export function editItemTrue(id) {
  return {
    type: EDIT_ITEM_TRUE,
    payload: {
      editorTrue: true,
      itemId: id,
    },
  };
}

export function editItemFalse() {
  return {
    type: EDIT_ITEM_FALSE,
    payload: {
      editorFalse: false,
      itemId: 0,
    },
  };
}

export function excludedSucces(newExpenses, newTotalExpense) {
  return {
    type: EXCLUDED_ITEM_DONE,
    payload: {
      expenses: newExpenses,
      totalExpense: newTotalExpense,
    },
  };
}

export function fetchCoinsDataSucces(coins) {
  return {
    type: FETCH_DATA_COINS_SUCCESS,
    payload: {
      coinsName: Object.keys(coins),
    },
  };
}

export function fetchCoinsDataError(error) {
  return {
    type: FETCH_DATA_COINS_ERROR,
    payload: {
      error,
    },
  };
}

export const fetchCoinsDataThunk = () => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((response) => {
      delete response.USDT; // deleta somente a chave USDT
      dispatch(fetchCoinsDataSucces(response));
    })
    .catch((error) => {
      dispatch(fetchCoinsDataError(error));
    });
};

export function fetchValueCoinSucces(coins) {
  return {
    type: FETCH_VALUE_COINS_SUCCESS,
    payload: {
      expenses: coins,
    },
  };
}

export function totalExpense(total) {
  return {
    type: TOTAL_EXPENSES_DONE,
    payload: {
      totalExpense: total,
    },
  };
}

let TOTAL = [];

export const fetchCoinValueThunk = (state, id) => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((response) => {
      delete response.USDT; // deleta somente a chave USDT
      const expensesData = {
        value: state.valueInput,
        description: state.descriptionInput,
        method: state.method,
        currency: state.coins,
        tag: state.tag,
        id,
        exchangeRates: response,
      };
      const values = state.valueInput * response[state.coins].ask;
      TOTAL.push(values);
      const reduceTotal = TOTAL.reduce((acc, element) => acc + element, 0);
      dispatch(totalExpense(reduceTotal.toFixed(2)));
      dispatch(fetchValueCoinSucces(expensesData));
    })
    .catch((error) => {
      dispatch(fetchCoinsDataError(error));
    });
};

export const excludeSelected = (e, expensesData) => (dispatch) => {
  // const { expensesData, dispatch } = this.props;
  TOTAL = [];
  const newExpense = expensesData.filter((element) => element.id !== e);
  const newExpenseWithNewId = newExpense.reduce((acc, element) => {
    const values = Number(element.value)
    * Number(element.exchangeRates[element.currency].ask);
    TOTAL.push(values);
    // element.id = index;
    acc.push(element);
    return acc;
  }, []);
  const reduceTotal = TOTAL.reduce((acc, element) => acc + element, 0);
  dispatch(excludedSucces(newExpenseWithNewId, reduceTotal.toFixed(2)));
};

export const itemChanged = (item) => async (dispatch) => {
  const values = Number(item.value) * Number(item.exchangeRates[item.currency].ask);
  TOTAL.push(values);
  const reduceTotal = TOTAL.reduce((acc, element) => acc + element, 0);
  dispatch(totalExpense(reduceTotal.toFixed(2)));
  dispatch(fetchValueCoinSucces(item));
};
