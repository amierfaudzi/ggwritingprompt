import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import About from './components/About/About';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Write from './components/Write/Write';
import WritingPrompt from './components/WritingPrompt/WritingPrompt';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch >
          <Route path='/write/:promptId' component={Write}/>
          <Route path='/write' component={WritingPrompt}/>
          <Route path='/about' component={About}/>
          <Route path='/' component={Home}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
