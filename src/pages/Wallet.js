import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { fetchCoinsDataThunk, fetchCoinValueThunk } from '../actions';
import ExpenseTable from './ExpensesTable';

class Wallet extends React.Component {
  state = {
    valueInput: '',
    descriptionInput: '',
    method: '',
    tag: '',
    coins: '',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinsDataThunk());
  }

 saveExpenses = async () => {
   const { dispatch, expensesData } = this.props;
   dispatch(fetchCoinValueThunk(this.state, expensesData.length));
   this.setState({ valueInput: 0 });
 };

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value });

  render() {
    const { coinsData } = this.props;
    const { method, tag, valueInput, descriptionInput, coins } = this.state;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="valueInput">
            Despesa:
            <input
              value={ valueInput }
              onChange={ this.onInputChange }
              id="valueInput"
              name="valueInput"
              data-testid="value-input"
              type="text"
            />
          </label>
          <label htmlFor="descriptionInput">
            Descrição:
            <input
              value={ descriptionInput }
              onChange={ this.onInputChange }
              id="descriptionInput"
              name="descriptionInput"
              data-testid="description-input"
              type="text"
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select
              name="coins"
              value={ coins }
              onChange={ this.onInputChange }
              id="currencies"
              aria-label="moeda"
            >
              {coinsData.map((coin) => (
                <option key={ coin } value={ coin }>
                  {' '}
                  {coin}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Pagamento:
            <select
              name="method"
              value={ method }
              data-testid="method-input"
              id="method"
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              value={ tag }
              data-testid="tag-input"
              id="tag"
              onChange={ this.onInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.saveExpenses }
          >
            Adicionar despesa

          </button>
        </form>
        <ExpenseTable />
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  coinsData: globalState.wallet.currencies,
  expensesData: globalState.wallet.expenses,
});

Wallet.propTypes = {
  dispatch: propTypes.func.isRequired,
  coinsData: propTypes.string.isRequired,
  expensesData: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
