import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const API_URL = 'https://taskmanagementtool.herokuapp.com/login';

export default class login extends React.Component {


    constructor() {


        super();
        this.state = {
            email:'',
            password: ''

        }
    }


    handleChange = ({target: {name ,  value}}) => {


        this.setState({[name] : value});
    }

    handlesubmit = (event) =>{

        event.preventDefault();

        this.login();
    }

    login = async () =>{

     const {data} = await axios.post(API_URL , {

        email:this.state.email,
        password:this.state.password

     },{

        withCredentials:true
     })

     if(data.result == "error"){
        alert(data.message);
       
      
      }
      
      else{
         
        const cookies = new Cookies();
  cookies.set('access_token' , data.access_token ,{path: '/', expires: new Date(Date.now()+2592000), secure: true,  httpOnly: false,sameSite: "none"})
  this.props.history.push(`/dashboard`);    
      
      }
      
 
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
                
                <h6 class="font-weight-light">Sign in to continue.</h6>
                <form class="pt-3" onSubmit={this.handlesubmit}>
                  <div class="form-group">
                    <input type="email" class="form-control form-control-lg"  name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} />
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg"  placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="Submit"> SIGN IN</button>
                  </div>
                  <div class="my-2 d-flex justify-content-between align-items-center">
                    <div class="form-check">                  
                    </div>
                    <a href="/forgetPassword" class="auth-link text-black">Forgot password?</a>
                  </div>
                 
                  <div class="text-center mt-4 font-weight-light"> Don't have an account? <a href="/Registration" class="text-primary">Create</a>
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