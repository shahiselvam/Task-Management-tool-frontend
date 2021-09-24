import React from 'react';
import Header from './header';
import Nav from './nav';
import axios from 'axios';


const API_URL = 'https://taskmanagementtool.herokuapp.com/employeeRegistration'

export default class createUser extends React.Component {

    constructor() {

        super();

        this.state = {

            FirstName: '',
            LastName: '',
            email: '',
            password: '',
            confirmpassword: '',
            Role: '',
            team: ''
        }
    }



    handleChange = ({target:{name, value}}) =>{

     this.setState({[name] : value});

    }

    handleSubmit = (event) =>{

        event.preventDefault();
        this.createUser();
    }

    createUser = async () =>{
        
        const { data } = await axios.post(API_URL, {

            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            email: this.state.email,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword,
            role: this.state.Role,
            team:this.state.team

        },
            {

                withCredentials: true

            })
            
        if (data.result == "success") {

            alert(data.message);
        }

        else {

            alert(data.message);
        }


        this.setState({ FirstName: '', LastName: '', email: '', password: '', confirmpassword: '' ,  Role:'' , team:''})
    }
    
    render() {

        return (
            <>
                <div class="container-scroller">
                    <Nav />
                    <div class="container-fluid page-body-wrapper">
                        <Header />
                        <div class="main-panel">
                            <div class="content-wrapper">
                                <div class="page-header">
                                    <h3 class="page-title"> Create user </h3>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#">dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Create user</li>
                                        </ol>
                                    </nav>
                                </div>
                                <div class="row">
                                    <div class="col-12 grid-margin stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">Create user</h4>
                                                <p class="card-description"> Create user </p>
                                                <form class="forms-sample" onSubmit={this.handleSubmit}>
                                                    <div class="form-group">
                                                        <label for="exampleInputName1">First Name</label>
                                                        <input type="text" class="form-control" placeholder="FirstName" name="FirstName" value={this.state.FirstName} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleInputName1">Last Name</label>
                                                        <input type="text" class="form-control" placeholder="LastName" name="LastName" value={this.state.LastName} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleInputEmail3">Email address</label>
                                                        <input type="email" class="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleInputPassword4">Password</label>
                                                        <input type="password" class="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleInputPassword4">Confirm Password</label>
                                                        <input type="password" class="form-control" placeholder="confirmpassword" name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleChange} />
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="exampleInputPassword4">Team</label>
                                                        <select class="form-control form-control-sm"  name="team" value={this.state.team} onChange={this.handleChange}>
                                                        <option value="" disabled selected hidden>Select Team</option>
                                                            <option value="Software Development">Software Development </option>
                                                            <option value="Marketing">Marketing</option>
                                                            <option value="Accounts">Accounts</option>
                                                            <option value="Design">Design</option>
                                                           
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleInputPassword4">Role</label>
                                                        <select class="form-control form-control-sm" name="Role" value={this.state.Role} onChange={this.handleChange}>
                                                        <option value="" disabled selected hidden>Select Role</option>
                                                            <option value="Team Lead">Team Lead</option>
                                                            <option value="Senior Lead">Senior Development</option>
                                                        </select>
                                                    </div>
                                                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                                                 
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )

    }


}