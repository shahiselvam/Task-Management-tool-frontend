import React from 'react';
import axios from 'axios';



const API_URL = 'https://taskmanagementtool.herokuapp.com/reset';


export default class reset extends React.Component{


    constructor(){


        super();
        this.state={

            password:'',
            confirmpassword:''

        }

    }

    componentDidMount() {
        const token = this.props.match.params.token;
        
          this.checkIfValid(token);
        
        }
        handleChange = ( { target: { name , value } }) =>{
        
          this.setState({ [name] : value })
          
          }
          handleSubmit = (event) =>
          {
        
           event.preventDefault();
           this.newPassword();
          }
          
          newPassword = async () =>
          {
            debugger
            const token = this.props.match.params.token;
          const { data } = await axios.post(`${API_URL}/${token}`, {
           password:this.state.password,
           confirmpassword: this.state.confirmpassword
          
          },{
        
            withCredentials: true
          });
         
          if(data.result == "Success"){
          
            
            alert(data.message); 
            this.props.history.push("/login");  
          }
          
          else{
          
            alert(data.message);
          }
          
          this.setState({password:'' ,confirmpassword:'' })
        
          
            }
        
         checkIfValid = async (token) =>{
          
        
          const { data} = await axios.get(`${API_URL}/${token}`,{
        
            withCredentials: true
          });
        
          if(data.result == "error"){
        
        
            alert(data.message); 
            this.props.history.push("/Forget");  
          }
        
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
                
                <h6 class="font-weight-light">Reset Password</h6>
                <form class="pt-3" onSubmit={this.handleSubmit}>
          
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg"  placeholder="New password" name="password" value={this.state.password} onChange={this.handleChange} />
                  </div>
                  <div class="form-group">
                    <input type="password" class="form-control form-control-lg"  placeholder="Confirm Password" name="confirmpassword" value={this.state.confirmpassword} onChange={this.handleChange} />
                  </div>

                  <div class="mt-3">
                    <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="Submit"> Submit</button>
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