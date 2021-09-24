import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'https://taskmanagementtool.herokuapp.com/userDetails';
export default class Header extends React.Component {


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
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
            <li class="nav-item nav-profile">
              <a href="#" class="nav-link">
                <div class="profile-image">
                  
                  <div class="dot-indicator bg-success"></div>
                </div>
                <div class="text-wrapper">
                  <p class="profile-name">{this.state.userName}</p>
                  <p class="designation">{this.state.userRole} / {this.state.userTeam}</p>
                </div>
                <div class="icon-container">
                  <i class="icon-bubbles"></i>
                  <div class="dot-indicator bg-danger"></div>
                </div>
              </a>
            </li>
            <li class="nav-item nav-category">
              <span class="nav-link">Dashboard</span>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/dashboard">
                <span class="menu-title">Dashboard</span>
                <i class="icon-screen-desktop menu-icon"></i>
              </a>
            </li>
            <li class="nav-item nav-category"><span class="nav-link">USERS</span></li>
            <li class="nav-item">
              <Link to="/createUser"> 
              <a class="nav-link" data-toggle="collapse" href="/createUser" aria-expanded="false" aria-controls="ui-basic">
                <span class="menu-title">Create user</span>
                <i class="icon-layers menu-icon"></i>
              </a>
              </Link>
              <Link to="/viewuser"> 
              <a class="nav-link" data-toggle="collapse" href="/createUser" aria-expanded="false" aria-controls="ui-basic">
                <span class="menu-title">View user</span>
                <i class="icon-grid menu-icon"></i>
              </a>
              </Link>
              
            </li>
            <li class="nav-item nav-category"><span class="nav-link">Projects</span></li>
            <li class="nav-item">
              <Link to="/createproject"> 
              <a class="nav-link" data-toggle="collapse" href="/createproject" aria-expanded="false" aria-controls="ui-basic">
                <span class="menu-title">Create Project</span>
                <i class="icon-layers menu-icon"></i>
              </a>
              </Link>
              <Link to="/viewproject"> 
              <a class="nav-link" data-toggle="collapse" href="/viewproject" aria-expanded="false" aria-controls="ui-basic">
                <span class="menu-title">View Project</span>
                <i class="icon-grid menu-icon"></i>
              </a>
              </Link>
              
            </li>
            
          </ul>
        </nav>
      
            

            </>
        );
    }
}