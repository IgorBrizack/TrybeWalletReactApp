import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class ExpensesTable extends React.Component {
  render() {
    const { expensesData } = this.props;
    return (
      <div>
        <table>
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
            </tr>
          ))}

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
  // dispatch: propTypes.func.isRequired,
  // coinsData: propTypes.string.isRequired,
  expensesData: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
