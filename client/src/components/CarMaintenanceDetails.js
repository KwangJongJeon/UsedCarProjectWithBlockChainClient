import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CarContract from "../contracts/Car.json";
import CarManagerContract from "../contracts/CarManager.json";

import getWeb3 from "../getWeb3";

import MaintenanceItem from './MaintenanceItem'

class CarMaintenanceDetails extends Component {


    state = {
        loaded: false,
        car: '',
        mileage: '',
        VINStatus: '',
        tuningStatus: '',
        specialHistory: '',
        changeOfPurpose: '',
        color: ''
    }

    // this.props.match.params.id ==> address
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
                CarContract.abi, this.props.match.params.id
            )

            // Set Web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods
            await this.loadCarFromBlockChain();
            
            this.setState({ 
                loaded: true, 
            });
        }
        catch(error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details`
            );

            console.error(error);
        }  
    }

    loadCarFromBlockChain = async () => {
        try {
            let carObj = await this.carManager.methods.cars(this.props.match.params.id).call()
            await console.log("---------------------------")
            await console.log(this.car);
            await console.log("---------------------------")
        }
        catch(error) {
            alert(`Failed to load Cars from blockChain`);
            console.error(error);
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        if(!this.check_input()) {
            // save check receipt to BlockChain
            const { mileage, VINStatus, tuningStatus, changeOfPurpose, specialHistory, color } = this.state;
            let result = await this.car.methods.basicCarInfoCheck(mileage, VINStatus, tuningStatus, specialHistory, changeOfPurpose, color).send({from: this.accounts[0]});
            console.log(result);
            alert("basic check is completed!")

            // set post's isInitialInspected true
            axios
                .put('http://localhost:8082/api/sellCarPosts/setCheckTrue/' + this.props.match.params.id)
                .then(res => {
                    console.log("res--------------------------")
                    console.log(res);
                    console.log("-----------------------------")
                })
                .catch(err => {
                    console.log("Error on handleSubmit in CarMaintenanceDetails ")
                })
            
            this.props.history.push('/maintenance-car');        

        }
    }

    check_input = () => {
        if (this.state.mileage === '') {
            alert("??????????????? ???????????????");    
            return false;
        }
        // model??? ???????????? ????????? ??????.
        if (this.state.VINStatus === '') {
            alert("???????????? ????????? ???????????????");
            return false;
        }
        // description??? ???????????? ????????? ??????.
        if (this.state.tuningStatus === '') {
            alert("?????? ????????? ???????????????");
            return false;
        }
        // price??? ???????????? ????????? ??????.
        if (this.state.changeOfPurpose === '') {
            alert("?????? ?????? ????????? ???????????????");
            return false;
        }

        if (this.state.color === '') {
            alert("????????? ???????????????");
            return false;
        }
    }

    render() {
        return (
            <div className="MaintenanceDetail">
                <div className="container col-xxl-10 px-5 py-5">

                    <div className="col-lg-4">
                        <h2>?????? ?????? ??????</h2>
                        <br/>
                    </div>
                    <hr/>
                    <form>
                        <div className = "mb-3">
                            <label htmlFor="mileage" className="form-label">?????? ??????</label>
                            <input type="text" className="form-control" name="mileage" id="mileage" placeholder="?????? ??????" value={this.state.mileage} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label htmlFor="VINStatus" className="form-label">???????????? ??????</label>
                            <input type="text" className="form-control" name="VINStatus" id="VINStatus" placeholder="???????????? ??????" value={this.state.VINStatus} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label htmlFor="tuningStatus" className="form-label">?????? ??????</label>
                            <input type="text" className="form-control" name="tuningStatus" id="tuningStatus" placeholder="?????? ??????" value={this.state.tuningStatus} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label htmlFor="specialHistory" className="form-label">?????? ??????</label>
                            <input type="text" className="form-control" name="specialHistory" id="specialHistory" placeholder="?????? ??????" value={this.state.specialHistory} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label htmlFor="changeOfPurpose" className="form-label">?????? ??????</label>
                            <input type="text" className="form-control" name="changeOfPurpose" id="changeOfPurpose" placeholder="?????? ??????" value={this.state.changeOfPurpose} onChange={this.handleChange}/>
                        </div>

                        <div className = "mb-3">
                            <label htmlFor="mileage" className="form-label">??????</label>
                            <input type="text" className="form-control" name="color" id="color" placeholder="??????" value={this.state.color} onChange={this.handleChange}/>
                        </div>
                        <br/>

                        <div className="div-style1">
                            <span className="btn btn-primary" onClick={this.handleSubmit}>????????????</span>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default CarMaintenanceDetails;