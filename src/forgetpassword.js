import React from 'react';
import axios from 'axios';

const API_URL = 'https://taskmanagementtool.herokuapp.com/forget'

export default class forgetPassword extends React.Component{

constructor(){

    super();

    this.state={

        email:''
    }
}
handleChange = ({target:{name , value}}) =>{
    
    this.setState({[name] : value})
   }
   
   handlesubmit = (event) =>{
       event.preventDefault();
       this.forget();
   }
   
   forget = async () =>{
   
    const {data} = await axios.post(API_URL , {
   email:this.state.email
   
    },{

       withCredentials: true
     }) 
    if(data.result == "success"){
   
   
       alert(data.message); 
     
     }
     
     else{
     
       alert(data.message);
     }
   
     this.setState({email:''});
   }
   
render(){

    return(

        <>

<div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row flex-grow">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo">
                 
                </div>
                
                <h6 class="font-weight-light">Forget Password</h6>
                <form class="pt-3" onSubmit={this.handlesubmit}>
                  <div class="form-group">
                    <input type="email" class="form-control form-control-lg"  name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} />
                  </div>
                 
                  <div class="mt-3">
                    <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="Submit"> Submit</button>
                  </div>
                  <div class="my-2 d-flex justify-content-between align-items-center">
                    <div class="form-check">                  
                    </div>
                    <a href="/login" class="auth-link text-black">Login</a>
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
