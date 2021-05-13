import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { SocketContext } from './sockets';
import { nanoid } from 'nanoid';

class Home extends React.Component {
  static contextType = SocketContext;

  constructor(props) {
    super(props);
    this.state = {
      username: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  render() {
    return (
      <div className="home">
        <h1>Number Game</h1>
        <form>
          <div>
            username <br/>
            <input id="username" value={this.state.username} onChange={this.handleChange}/>
          </div>
        </form>
        <Button variant="contained" color="primary" onClick={() => {
          if(!this.state.username) {
            alert('ユーザー名を入力してください');
            return;
          }
          let room_id = nanoid(10);
          this.context.emit('create', room_id, this.state.username);
          this.props.history.push('/waiting/' + room_id);
        }}>ホストで始める</Button><br/>
        <Button variant="contained" color="primary" onClick={() => {
          this.props.history.push('/gamelist');
        }}>ゲームに参加する</Button>
      </div>
    )
  }
}

export default withRouter(Home);