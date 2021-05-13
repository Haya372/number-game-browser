import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WaitingRoom from './WaitingRoom';
import Home from './Home';
import GameList from './GameList';
import { socket, SocketContext } from './sockets';

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/waiting/:room_id" component={WaitingRoom} />
          <Route path="/gamelist" component={GameList} />
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
