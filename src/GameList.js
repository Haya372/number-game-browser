import React from 'react';
import { SocketContext } from './sockets';
import PeopleIcon from '@material-ui/icons/People';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';

class GameList extends React.Component {
  static contextType = SocketContext;

  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    let socket = this.context;
    socket.on('room list', (data) => {
      this.setState({
        rooms: data.rooms
      });
    });

    setTimeout(() => {
      socket.emit('get rooms');
    }, 100);
  }

  render() {
    let rooms = [];
    this.state.rooms.forEach((room) => {
      rooms.push(
        <ListItem button key={room.room_id} onClick={() => {
          // socket.emitの処理
          this.props.history.push('/waiting/' + room.room_id);
        }}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={room.host} secondary={"人数：" + room.people} />
        </ListItem>
      )
    });
    return (
      <div>
        <h1>ゲーム一覧</h1>
        {rooms}
        <Button variant="contained" color="primary" onClick={() => {
          this.context.emit('get rooms');
        }}>リロード</Button>
      </div>
    )
  }
}

export default withRouter(GameList);