import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { NavBar, HomePage, DeliveryCarList, DeliveryCarDetails } from './components';
import { AddCarToBlockChain, ShowCarDetails, SearchPart, ChargeCoin, ShowCarList, UpdateCarPostInfo} from './components';
import { CarMaintenancePage, CarMaintenanceDetails, CarReceipt} from './components';
import { LogIn, SignUp } from './components';
import './App.css';

import {SellPage} from './components';
import MaintenanceReceipt from './components/MaintenanceReceipt';



class App extends Component {
  render() {
    return (
      <Router>
        <NavBar/>
        <hr/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/buy-car/:id' component={CarReceipt}/>
          <Route path='/buy-car' component={ShowCarList} />
          <Route exact path="/show-car/:id" component={ShowCarDetails}/>
          <Route path="/show-car/maintenance-receipt/:id" component={MaintenanceReceipt}/>
          <Route path='/sell-car' component={AddCarToBlockChain} />
          <Route path='/edit-car/:id' component={UpdateCarPostInfo} />
          <Route path='/search-part' component={SearchPart} />
          <Route path='/add-coin' component={ChargeCoin} />
          <Route exact path='/maintenance-car' component={CarMaintenancePage}/>
          <Route exact path='/maintenance-car/:id' component={CarMaintenanceDetails}/>
          <Route path='/login' component={LogIn} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/delivery-car/:id' component = {DeliveryCarDetails}/>
          <Route path='/delivery-car' component = {DeliveryCarList}/>

        </Switch>
      </Router>
    ) 
  }
}

export default App;
