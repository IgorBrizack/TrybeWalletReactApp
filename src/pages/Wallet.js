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
    // const { coinsData } = this.props;
    return (
      <div>
        <Header />
        TrybeWallet
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  coinsData: globalState.wallet.currencies,
});

Wallet.propTypes = {
  dispatch: propTypes.func.isRequired,
  // coinsData: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
