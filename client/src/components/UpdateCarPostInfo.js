import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

class UpdateCarPostInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brand: '',
            model: '',
            carNum: '',
            carPrice: '',
            title: '',
            description: '',
        }
    }

    componentDidMount = () =>{
        axios
            .get('http://localhost:8082/api/sellCarPosts/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    brand: res.data.brand,
                    model: res.data.model,
                    title: res.data.title,
                    carNum: res.data.carNum,
                    carPrice: res.data.carPrice,
                    description: res.data.description
                })
            })
            .catch(err => {
                console.log("Error from UpdateCarInfo");
            })
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            brand: this.state.brand,
            model: this.state.model,
            carNum: this.state.carNum,
            carPrice: this.state.carPrice,
            title: this.state.title,
            description: this.state.description
        };

        axios
            .put('http://localhost:8082/api/sellCarPosts/' + this.props.match.params.id, data)
            .then(res => {
                this.props.history.push('/show-car/' + this.props.match.params.id);
            })
            .catch(err => {
                console.log("Error in UpdatedCarInfo!");
            })
    }

    render() {
        return (
            <div className="UpdateCarPostInfo">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br/>
                            <a href="/buy-car" className="btn btn-outline-warning float-left">
                                ?????? ?????? ????????? ??????
                            </a>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="col-md-8 m-auto">????????? ??????</h1>
                            <p className="lead text-center">
                                ?????? ??????
                            </p>
                        </div>
                    </div>

                    <div className="col-md-8 m-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className='form-group'>
                                <label htmlFor="title">??????</label>
                                <input
                                    type='text'
                                    placeholder='????????? ??????'
                                    name='title'
                                    className='form-control'
                                    value={this.state.title}
                                    onChange={this.onChange}
                                />
                            </div>
                            <br />
                            <div className='form-group'>
                                <label htmlFor="isbn">??????</label>
                                <input
                                    type='text'
                                    placeholder='??????'
                                    name='description'
                                    className='form-control'
                                    value={this.state.description}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="carPrice">??????</label>
                                <input
                                    type='text'
                                    placeholder='??????'
                                    name='carPrice'
                                    className='form-control'
                                    value={this.state.carPrice}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="brand">?????????</label>
                                <input
                                    type='text'
                                    placeholder='????????????'
                                    name='brand'
                                    className='form-control'
                                    value={this.state.brand}
                                    onChange={this.onChange}
                                    readOnly
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="model">??????</label>
                                <input
                                    type='text'
                                    placeholder='??????'
                                    name='model'
                                    className='form-control'
                                    value={this.state.model}
                                    onChange={this.onChange}
                                    readOnly
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="carNum">????????????</label>
                                <input
                                    type='text'
                                    placeholder='carNum'
                                    name='carNum'
                                    className='form-control'
                                    value={this.state.carNum}
                                    onChange={this.onChange}
                                />
                            </div>

                            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Book</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateCarPostInfo;