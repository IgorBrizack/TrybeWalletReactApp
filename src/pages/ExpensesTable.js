import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { excludeSelected, editItemTrue, editItemFalse } from '../actions';

class ExpensesTable extends React.Component {
  isToEdit = (elementID) => {
    const { editor, dispatch } = this.props;
    if (!editor) {
      dispatch(editItemTrue(elementID));
    } else {
      dispatch(editItemFalse());
    }
  }

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
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.isToEdit(element.id) }
                  >
                    Editar
                  </button>
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
  editor: globalState.wallet.editor,
});

ExpensesTable.propTypes = {
  dispatch: propTypes.func.isRequired,
  expensesData: propTypes.string.isRequired,
  editor: propTypes.bool.isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
