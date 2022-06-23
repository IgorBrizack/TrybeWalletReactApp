import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { fetchCoinsDataThunk } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCoinsDataThunk());
  }

  render() {
    const { coinsData } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="valueInput">
            Despesa:
            <input
              id="valueInput"
              name="valueInput"
              data-testid="value-input"
              type="text"
            />
          </label>
          <label htmlFor="descriptionInput">
            Descrição:
            <input
              id="descriptionInput"
              name="descriptionInput"
              data-testid="description-input"
              type="text"
            />
          </label>
          <label htmlFor="currencies">
            Moeda:
            <select
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
            <select data-testid="method-input" id="method">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select data-testid="tag-input" id="tag">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  coinsData: globalState.wallet.currencies,
});

Wallet.propTypes = {
  dispatch: propTypes.func.isRequired,
  coinsData: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
