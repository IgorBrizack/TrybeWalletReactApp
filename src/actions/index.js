// Coloque aqui suas actions

export const LOG_IN_SUCCES = 'LOG_IN_SUCCES';
export const FETCH_DATA_COINS_SUCCESS = 'FETCH_DATA_COINS_SUCCESS';
export const FETCH_DATA_COINS_ERROR = 'FETCH_DATA_COINS_ERROR';
export const FETCH_VALUE_COINS_SUCCESS = 'FETCH_VALUE_COINS_SUCCES';
export const TOTAL_EXPENCES_DONE = 'TOTAL_EXPENCES_DONE';

export function logInSucces(userData) {
  return {
    type: LOG_IN_SUCCES,
    payload: {
      email: userData.email,
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
    type: TOTAL_EXPENCES_DONE,
    payload: {
      totalExpense: total,
    },
  };
}

const TOTAL = [];

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
      dispatch(fetchValueCoinSucces(expensesData));
      const values = state.valueInput * response[state.coins].ask;
      TOTAL.push(values);
      const reduceTotal = TOTAL.reduce((acc, element) => acc + element, 0);
      dispatch(totalExpense(reduceTotal.toFixed(2)));
    })
    .catch((error) => {
      dispatch(fetchCoinsDataError(error));
    });
};
