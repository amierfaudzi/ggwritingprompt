import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Write from './components/Write/Write';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch >
          <Route path='/:promptId' component={Write}/>
          <Route path='/' component={Home}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
