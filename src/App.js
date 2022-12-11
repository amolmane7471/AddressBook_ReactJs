import Header from './components/Header';
import Home from './components/home/Home';
import AddressForm from './components/address-book-form/AddressForm';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
        <Route path="/addressbook-form" component={AddressForm} />
        <Route path="/home" component={Home} />   
        </Switch>
      </Router>
    </div>
  );
}

export default App;
