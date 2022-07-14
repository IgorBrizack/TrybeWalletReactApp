import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  state = {
    email: '',
  }

  componentDidMount() {
    const { history, email } = this.props;
    const mailStorage = localStorage.getItem('loginWallet');
    if (!email && !mailStorage) {
      history.push('/');
    } else {
      this.setState({ email: mailStorage });
    }
  }

  sum = () => {
    const { expensesData } = this.props;
    return expensesData.reduce((acc, element) => {
      acc += element.value * element.exchangeRates[element.currency].ask;
      return acc;
    }, 0);
  };

  render() {
    const { email } = this.state;
    const { totalExpense } = this.props;
    return (
      <div className="header-container">
        <div>
          <h1 data-testid="email-field">
            { `Usuário:  ${email}`}
          </h1>
        </div>
        <div className="expenses-container">
          {totalExpense ? <p data-testid="total-field">{totalExpense}</p> : (
            <p data-testid="total-field">{this.sum().toFixed(2)}</p>
          )}
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  totalExpense: globalState.wallet.totalExpense,
  expensesData: globalState.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  totalExpense: propTypes.string.isRequired,
  expensesData: propTypes.string.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
