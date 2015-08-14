import React from 'react';
import LoginStore from '../stores/LoginStore';
import RouterActions from '../actions/RouterActions';

function Authenticated(ComposedComponent) {
  return class Authenticated extends React.Component {

    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        RouterActions.updateNextPath(transition.path);
        transition.redirect('/login');
      }
    }

    constructor(props) {
      super(props);
      this.state = LoginStore.getState();
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      LoginStore.listen(this.handleChange);
    }

    componentWillUnmount() {
      LoginStore.unlisten(this.handleChange);
    }

    handleChange(state) {
      this.setState(state);
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          loggedIn={!!this.state.user}
        />
      );
    }
  };
}

module.exports = Authenticated;
