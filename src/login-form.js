import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'


// LoginForm is used to authenticate a user.
class LoginForm extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  redirectUser = () => {
    const { session } = this.props;
    const { router } = this.context;

    // Automatically redirect if a session user is present.
    if (session && session.user) {
      switch (session.user.role.toLowerCase()) {
        case 'student':
          router.replace('/dashboard');
          break;

        case 'admin':
          router.replace('/catalog');
          break;
      }
    }
  }

  componentWillMount() {
    this.redirectUser();
  }

  componentDidUpdate() {
    this.redirectUser();
  }

  onSubmit = (event) => {
    event.preventDefault();

    // Minor validation and cleaning of the form values.
    let username = this.refs.username.value;

    // Trim email if supplied.
    if (username.indexOf('@') >= 0) {
      username = username.slice(0, username.indexOf('@'));
    }

    let { dispatch } = this.props;

    // Dispatch the request to authenticate the user.
    dispatch(actions.authenticateUser(username, this.refs.password.value));
  }

  render() {
    const { session } = this.props;
    const authenticating = session && session.authenticating;

    let button;
    if (authenticating) {
      button = <button className="btn btn-primary"><i className="fa fa-spinner fa-fw fa-spin" /></button>;
    } else {
      button = <button className="btn btn-primary">Login</button>;
    }

    let message;
    if (session && session.unauthorized) {
      message = (
        <div className="alert alert-danger">
          <strong>Unauthorized.</strong> Please check your username and password.
        </div>
      );
    }

    return (
      <div className="col-md-6 col-md-offset-2">
        <h3>Login</h3>

        {message}

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              ref="username"
              className="form-control"
              type="text"
              required="true"
              disabled={authenticating} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              ref="password"
              className="form-control"
              type="password"
              required="true"
              disabled={authenticating} />
          </div>

          {button}

        </form>
      </div>
    );
  }
}

function select(state) {
  return {
    session: state.session
  };
}

export default connect(select)(LoginForm)
