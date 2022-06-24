import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  state = {
    total: 0,
  }

  render() {
    const { total } = this.state;
    const { email, totalExpense } = this.props;
    return (
      <div>
        <h1 data-testid="email-field">
          {' '}
          { email }
        </h1>
        {totalExpense ? <p data-testid="total-field">{totalExpense}</p> : (
          <p data-testid="total-field">{total}</p>
        )}
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  totalExpense: globalState.wallet.totalExpense,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  totalExpense: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
