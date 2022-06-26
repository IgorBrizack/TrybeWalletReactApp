// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_DATA_COINS_SUCCESS,
  FETCH_DATA_COINS_ERROR,
  FETCH_VALUE_COINS_SUCCESS,
  TOTAL_EXPENSES_DONE,
  EXCLUDED_ITEM_DONE,
  EDIT_ITEM_TRUE,
  EDIT_ITEM_FALSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalExpense: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_DATA_COINS_SUCCESS:
    return {
      ...state,
      currencies: action.payload.coinsName,
    };
  case FETCH_DATA_COINS_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  case FETCH_VALUE_COINS_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  case TOTAL_EXPENSES_DONE:
    return {
      ...state,
      totalExpense: action.payload.totalExpense,
    };
  case EXCLUDED_ITEM_DONE:
    return {
      ...state,
      expenses: [...action.payload.expenses],
      totalExpense: action.payload.totalExpense,
    };
  case EDIT_ITEM_TRUE:
    return {
      ...state,
      editor: action.payload.editorTrue,
      idToEdit: action.payload.itemId,
    };
  case EDIT_ITEM_FALSE:
    return {
      ...state,
      editor: action.payload.editorFalse,
      idToEdit: action.payload.itemId,
    };
  default:
    return state;
  }
};

export default walletReducer;
