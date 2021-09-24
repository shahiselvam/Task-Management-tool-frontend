import React from 'react';
import axios from 'axios';
import Header from './header';
import Nav from './nav';
import {Link} from 'react-router-dom';


const API_URL = 'https://taskmanagementtool.herokuapp.com/employeeRegistration';


export default class viewUser extends React.Component {

    constructor() {


        super();

        this.state = {

            User: []

        }
    }

    componentDidMount() {


        this.getUser();
    }


    getUser = async () => {

        const {data}  = await axios.get(API_URL, {

            withCredentials: true
        })

        if( data.result === "Success"){


          this.setState({ User: data.user })
       
        }

        else{

          alert(data.message)
        }
       


    }

    deleteUser = async (id) => {


      const {data} =   await axios.delete(`${API_URL}/${id}` , { withCredentials: true});

      if(data.result == "Success") {


        alert(data.message);
      }

      else{

        alert(data.message);
      }

      this.getUser();
        
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
                                    <h3 class="page-title"> View user </h3>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#">dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">View user</li>
                                        </ol>
                                    </nav>
                                </div>

                                <div class="row">

                                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">View user</h4>
                 
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th> First Name </th>
                          <th> LastName </th>
                          <th> Email </th>
                          <th> Role </th>
                          <th> Team </th>
                          <th>Edit</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>



                          {this.state.User.map(Users =>{
                              return(
                        <tr key={Users._id}>
                          <td>{Users.FirstName}</td>
                          <td>{Users.LastName}</td>
                          <td>{Users.email}</td>
                          <td>{Users.role}</td>
                          <td>{Users.team}</td>
                          <td><Link to={`/editUser/${Users._id}`}>  Edit </Link></td>
                          <td> 
                              <i class ="fa fa-trash"   onClick = { () => this.deleteUser(Users._id)} >
                                  
                             Delete
                              </i></td>
                        </tr>
                        )
                          })}
                      </tbody>
                    </table>
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