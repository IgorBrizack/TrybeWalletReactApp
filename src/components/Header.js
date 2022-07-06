import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
 sum = () => {
   const { expensesData } = this.props;
   return expensesData.reduce((acc, element) => {
     acc += element.value * element.exchangeRates[element.currency].ask;
     return acc;
   }, 0);
 };

 render() {
   const { email, totalExpense } = this.props;
   return (
     <div>
       <h1 data-testid="email-field">
         {' '}
         { email }
       </h1>
       {totalExpense ? <p data-testid="total-field">{totalExpense}</p> : (
         <p data-testid="total-field">{this.sum().toFixed(2)}</p>
       )}
       <p data-testid="header-currency-field">BRL</p>
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
};

export default connect(mapStateToProps)(Header);
