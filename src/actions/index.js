// Coloque aqui suas actions

export const LOG_IN_SUCCES = 'LOG_IN_SUCCES';
export const FETCH_DATA_COINS_SUCCESS = 'FETCH_DATA_COINS_SUCCESS';
export const FETCH_DATA_COINS_ERROR = 'FETCH_DATA_COINS_ERROR';

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
