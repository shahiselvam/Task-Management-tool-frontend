import React from 'react';
import axios from 'axios';
import Header from './header';
import Nav from './nav';
import {Link} from 'react-router-dom';

const API_URL = 'https://taskmanagementtool.herokuapp.com/projects';

export default class viewProjects extends React.Component{

constructor(){


    super();

    this.state = {

     Project: []

    }
}
componentDidMount() {


    this.getProject();
}


getProject = async () => {

    const {data}  = await axios.get(API_URL, {

        withCredentials: true
    })

    if( data.result === "Success"){


      this.setState({ Project: data.Project })
   
    }

    else{

      alert(data.message)
    }
   


}


deleteProject = async (id) => {


    const {data} =   await axios.delete(`${API_URL}/${id}` , { withCredentials: true});

    if(data.result == "Success") {


      alert(data.message);
    }

    else{

      alert(data.message);
    }

    this.getProject();
      
  }


render(){
    return(
        <>
        <div class="container-scroller">
                    <Nav />
                    <div class="container-fluid page-body-wrapper">
                        <Header />
                        <div class="main-panel">
                            <div class="content-wrapper">
                                <div class="page-header">
                                    <h3 class="page-title"> View Project </h3>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#">dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">View Project</li>
                                        </ol>
                                    </nav>
                                </div>

                                <div class="row">

                                <div class="col-lg-12 grid-margin stretch-card">
                <div class="card">
                  <div class="card-body">
                    <h4 class="card-title">View Project</h4>
                 
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th> Project Name </th>
                          <th> Team </th>
                          <th> Due date </th> 
                          <th>Assign Task</th>                    
                          <th>View</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>



                          {this.state.Project.map(Projects =>{
                              return(
                        <tr key={Projects._id}>
                          <td><Link to={`/Tasks/${Projects._id}`}> {Projects.projectName}</Link></td>
                          <td>{Projects.team}</td>
                          <td>{Projects.dueDate}</td>
                          
                          <td><Link to={`/Assigntask/${Projects._id}`}>  Assign Task </Link></td>
                          <td><Link to={`/Tasks/${Projects._id}`}>  View Task</Link></td>
                          <td> 
                              <i class ="fa fa-trash"   onClick = { () => this.deleteProject(Projects._id)} >
                                  
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
