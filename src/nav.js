import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'https://taskmanagementtool.herokuapp.com/userDetails';
export default class nav extends React.Component {


    constructor() {


        super();

        this.state = {

          userName:'',
          userRole:'',
          userTeam:''

        }
    }

    componentDidMount() {

      this.getUser();
  }

  getUser = async () =>{
    
      const {data } = await axios.get(API_URL ,{

        withCredentials: true
    })
      if(data.result == "Success"){

          this.setState({userName: data.user.FirstName , userRole:data.user.role , userTeam:data.user.team})
      }
  }

    render() {


        return (
            <>

            <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="navbar-brand-wrapper d-flex align-items-center">
          <a class="navbar-brand brand-logo" href="index.html">
           
          </a>
          
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center flex-grow-1">
          <h5 class="mb-0 font-weight-medium d-none d-lg-flex">Welcome  {this.state.userName}!</h5>
          <ul class="navbar-nav navbar-nav-right ml-auto">
           
            <li class="nav-item dropdown d-none d-xl-inline-flex user-dropdown">
              <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                <span class="font-weight-normal"> {this.state.userName} </span></a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                <div class="dropdown-header text-center">
                 
                  <p class="mb-1 mt-3">{this.state.userTeam}</p>
                  <p class="font-weight-light text-muted mb-0">{this.state.userRole}</p>
                </div>
               
               <Link to={"/login"}>  <a class="dropdown-item"><i class="dropdown-item-icon icon-power text-primary"></i>Sign Out</a></Link>
              </div>
            </li>
          </ul>
          <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="icon-menu"></span>
          </button>
        </div>
      </nav>
           
            </>
        );
    }
}