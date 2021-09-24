import React from 'react';
import axios from 'axios';

const API_URL = 'https://taskmanagementtool.herokuapp.com/registration'

export default class Registration extends React.Component {


    constructor() {


        super();

        this.state = {

            FirstName:'',
            LastName:'',
            email:'',
            password:'',
            confirmpassword:''


        }
    }
    handleChange = ({target:{name , value}}) => {

       this.setState({[name] : value })

    }

    handleSubmit = event =>{

        event.preventDefault();

        this.createUser();

    }

    createUser = async () =>{

const { data } = await axios.post(API_URL , {

  FirstName:this.state.FirstName,
  LastName:this.state.LastName,
  email:this.state.email,
  password:this.state.password,
  confirmpassword:this.state.confirmpassword,
  role:'manager',
  team:'management'


},{

  withCredentials: true
}
)

if(data.result == "success"){
    
  alert(data.message);
}

else{

  alert(data.message);
}


this.setState({FirstName:'' ,LastName:'' , email : '' , password: '', confirmpassword: ''})


    }

    render() {


        return (
            <>
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row flex-grow">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo">
                  
                </div>
                <h4>New here?</h4>
                <h6 class="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form class="pt-3" onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <input type="text" name="FirstName" value={this.state.FirstName} class="form-control form-control-lg"  placeholder="FirstName" onChange={this.handleChange} />
                  </div>
                  <div class="form-group">
                    <input type="text" name="LastName" value={this.state.LastName} class="form-control form-control-lg"  placeholder="LastName" onChange={this.handleChange} />
                  </div>
                  <div class="form-group">
                    <input type="email" name="email" value={this.state.email} class="form-control form-control-lg" placeholder="Email" onChange={this.handleChange} />
                  </div>
                  
                  <div class="form-group">
                    <input type="password" name="password" value={this.state.password} class="form-control form-control-lg" placeholder="Password" onChange={this.handleChange} />
                  </div>
                  <div class="form-group">
                    <input type="password" name="confirmpassword" value={this.state.confirmpassword} class="form-control form-control-lg" placeholder="Confirm password" onChange={this.handleChange} />
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="Submit"> Submit  </button>
                  </div>
                  <div class="text-center mt-4 font-weight-light"> Already have an account? <a href="/login" class="text-primary">Login</a>
                  </div>
                </form>
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
