import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { excludeSelected } from '../actions';

class ExpensesTable extends React.Component {
  render() {
    const { expensesData, dispatch } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expensesData && expensesData.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
                <td>
                  {(element.value * element.exchangeRates[element.currency].ask)
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => dispatch(excludeSelected(element.id, expensesData)) }
                  >
                    excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  coinsData: globalState.wallet.currencies,
  expensesData: globalState.wallet.expenses,
});

ExpensesTable.propTypes = {
  dispatch: propTypes.func.isRequired,
  // coinsData: propTypes.string.isRequired,
  expensesData: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
