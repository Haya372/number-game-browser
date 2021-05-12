import React from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { SocketContext } from './sockets';

class Home extends React.Component {
  static contextType = SocketContext;

  render() {
      console.log(this.context);
    return (
      <div className="home">
        <h1>Number Game</h1>
        <form>
          <div>
            username <br/>
            <input id="username" />
          </div>
        </form>
        <Button variant="contained" color="primary" onClick={() => {
          this.props.history.push('/waiting/test');
        }}>ホストで始める</Button><br/>
        <Button variant="contained" color="primary" onClick={() => {
          this.props.history.push('/gamelist');
        }}>ゲームに参加する</Button>
      </div>
    )
  }
}

export default withRouter(Home);