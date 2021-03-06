import React, { Component } from "react";
import Select from 'react-select';
import { Link } from 'react-router-dom';

import CarContract from "../contracts/Car.json";
import CarManagerContract from "../contracts/CarManager.json";

import getWeb3 from "../getWeb3";

import '../App.css';
import Sell from "./Sell.jsx"

class AddCarToBlockChainProto extends Component {
    state = {
        loaded: false, cost: 0, carName: "example_1",
        brand: '',
        model: '',
        car_num: '',
        description: '',
        price: '',
        model_option:[]
    }
    
    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance
            this.web3 = await getWeb3();

            // Use web3 to get the user's accounts
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract instance.
            this.networkId = await this.web3.eth.net.getId();

            this.carManager = new this.web3.eth.Contract(
                CarManagerContract.abi,
                CarManagerContract.networks[this.networkId] && CarManagerContract.networks[this.networkId].address
            );

            this.car = new this.web3.eth.Contract(
                CarContract.abi,
                CarContract.networks[this.networkId] && CarContract.networks[this.networkId].address,
            );

            // Set Web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods
            this.listenToPaymentEvent();
            this.setState({ loaded: true });
        }
        catch(error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details`
            );

            console.error(error);
        }  
    };

    listenToPaymentEvent = () => {
        let self = this;
        this.carManager.events.SupplyChainStep().on("data", async function(event) {
            console.log(event);
            let carObj = await self.carManager.methods.cars(event.returnValues._carIndex).call();
            console.log("methods");
            console.log(self.carManager.methods);
            console.log("carObj");
            console.log(carObj);
            alert("Car " + carObj._identifier + " was paid, delivery now!")
        });
      }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async() => {
        const {cost, carName} = this.state;
        let result = await this.carManager.methods.createCar(carName, cost).send({from: this.accounts[0]});
        console.log(result);
        alert("Send " + cost + "Wei to " + result.events.SupplyChainStep.returnValues._carAddress);
    }

    render() {
        {/* ????????? ????????? state??? ????????? ????????? */}
        const { brand, car_num, description, price, model_option } = this.state;
        const { appChange, appChangeModel, appClick } = this;

        return (
            <div className="Sell">
                <div className="container col-xxl-10 px-5 py-5">
                    <div className="col-lg-4">
                        
                        <h3>???????????? ??????</h3>

                        {/* ?????? ????????? ?????????. */}
						<div className="div-style1">
                            <h6>?????? ???????????? ??????????????????.</h6>
							<select className="form-control" id="brand" name="brand" value={brand} onChange={appChange}>
								<option value="0">????????? ???????????? ??????????????????</option>
								<option value="hyndai">??????</option>
								<option value="genesis">????????????</option>
								<option value="kia">??????</option>
								<option value="gm_korea">??????GM</option>
								<option value="renault_samsumg">????????????</option>
								<option value="ssangyong">??????</option>
								<option value="benz">??????</option>
								<option value="bmw">BMW</option>
								<option value="audi">?????????</option>
								<option value="volkswagen">????????????</option>
								<option value="lexus">?????????</option>
								<option value="toyota">?????????</option>
								<option value="landrover">????????????</option>
								<option value="mini">??????</option>
								<option value="volvo">??????</option>
								<option value="jaguar">?????????</option>
								<option value="jeep">??????</option>
								<option value="porsche">?????????</option>
							</select>
						</div>

                        {/* ?????? ?????? ?????????. */}
                        <div className="div-style1">
							<h6>?????? ????????? ??????????????????.</h6>
                            <Select className="form-control" id="model" name="model" onChange={appChangeModel} options={model_option}/>
						</div>

                        {/* ?????? ?????? ?????????. */}
						<div className="div-style1">
                            <h6>?????? ????????? ??????????????????.</h6>
							<input type="text" className="form-control" placeholder="?????? ??????" name="car_num" id="car_num" value={car_num} onChange={appChange}/>
                        </div>


                        {/* ?????? ?????? ?????????. */}
						<div className="div-style1">
                            <h6>?????? ????????? ??????????????????.</h6>
                            <textarea type="text" className="textarea-style" placeholder="?????? ??????" 
                             name="description" id="description" value={description} onChange={appChange}/>
                        </div>

						{/* ?????? ?????? ?????????. */}
						<div className="div-style1">
                            <h6>?????? ????????? ??????????????????.</h6>
							<input type="text" className="form-control" placeholder="?????? ??????" name="price" id="price" value={price} onChange={appChange}/>
                        </div>
                        
                        <br/>

                        {/* ????????? ?????? ?????? ??????. */}
                        <div className="div-style1">
                            <span className="btn btn-primary form-control" onClick={appClick}>??????</span>&nbsp; 
                        </div>          
                    </div>
                </div>    
            </div>
        )
    }
}

export default AddCarToBlockChainProto;