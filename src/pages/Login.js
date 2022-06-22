import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { logInSucces } from '../actions';

const PASSWORD_MINIMUN_LENGTH = 5;

class Login extends React.Component {
  state = {
    isDisabled: true,
    email: '',
    passwordInput: '',
  }

  doLogin = () => {
    const { history, saveData } = this.props;
    const { email } = this.state;
    saveData({ email });
    history.push('/carteira');
  };

  // validação de email com regex
  // https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
  // com o email.includes('.com') no if do checkInputFields darias certo, porém poderia ser qualquer email aleatório. Com o regex, ele limita para que o @ e o . venham um na sequência do outro, caso isso não ocorra nossa função retorna falso.
  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  checkInputFileds = () => {
    const { email, passwordInput } = this.state;
    if (this.validateEmail(email) && passwordInput.length > PASSWORD_MINIMUN_LENGTH) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  onInputChange = ({ target }) => this.setState({ [target.name]: target.value },
    this.checkInputFileds)

  render() {
    const { isDisabled, email } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              value={ email }
              type="email"
              data-testid="email-input"
              id="email"
              onChange={ this.onInputChange }
              name="email"
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

const mapDispatchToProps = (dispatch) => ({
  saveData: (state) => dispatch(logInSucces(state)),
});

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  saveData: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
