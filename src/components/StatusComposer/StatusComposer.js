import React from 'react';
import LoginStore from '../../stores/LoginStore';
import { Input } from 'react-bootstrap';
import http from 'axios';

require('./StatusComposer.scss');

const ENTER_KEY_CODE = 13;

class StatusComposer extends React.Component {
  static propTypes = { user: React.PropTypes.object.isRequired };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      err: null,
    };
  }

  _onChange = (e) => {
    this.setState({text: e.target.value});
  }

  _updateStatus = (e) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      const token = LoginStore.getToken();

      if (!token) return;

      const text = this.state.text;

      if (text) {
        http.post('/api/posts/text', {
          user_id: this.props.user._id,
          content: text,
        },
        {
          headers: { 'Authorization': 'JWT ' + token },
        })
        .then(() => {
          this.setState({
            text: '',
            err: null,
          });
        })
        .catch((err) => {
          this.setState({ err: err.data });
        });
      }
    }
  }

  render() {
    return (
      <div className="status-composer">
        <Input onChange={this._onChange} onKeyDown={this._updateStatus} type="textarea" placeholder="Write something awesome..." />
      </div>
    );
  }
}

module.exports = StatusComposer;
