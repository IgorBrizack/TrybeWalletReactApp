import React from 'react';
import propTypes from 'prop-types';

const PASSWORD_MINIMUN_LENGTH = 6;

class Login extends React.Component {
  state = {
    isDisabled: true,
    emailInput: '',
    passwordInput: '',
  }

  doLogin = () => {
    const { history } = this.props;
    history.push('/carteira');
  };

  checkInputFileds = () => {
    const { emailInput, passwordInput } = this.state;
    if (emailInput.includes('@') && passwordInput.length > PASSWORD_MINIMUN_LENGTH) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value },
    this.checkInputFileds)

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              type="email"
              data-testid="email-input"
              id="email-input"
              onChange={ this.onInputChange }
              name="emailInput"
            />
          </label>
          <label htmlFor="password-input">
            Password:
            <input
              type="text"
              data-testid="password-input"
              id="password-input"
              onChange={ this.onInputChange }
              name="passwordInput"
            />
          </label>
          <button
            disabled={ isDisabled }
            type="button"
            onClick={ this.doLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default Login;
