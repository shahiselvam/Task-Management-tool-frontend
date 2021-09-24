import React from 'react';
import Header from './header';
import Nav from './nav';
import axios from 'axios';


const API_URL = 'https://taskmanagementtool.herokuapp.com/projects';

export default class createProject extends React.Component{

constructor(){


    super();
    this.state ={

     projectName:'',
     team:'',
     dueDate: Date
     

    }
}

handleChange = ({target:{ name , value}}) =>{


    this.setState({[name] : value});
}

handleSubmit = (event) =>{

    event.preventDefault();

    this.createProject();
}

createProject = async () =>{
    const { data } = await axios.post(API_URL, {

        projectName: this.state.projectName,
        team: this.state.team,
        dueDate: this.state.dueDate,
       

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


    this.setState({ projectName: '', team: '', dueDate: ''})
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
                                    <h3 class="page-title"> Create Project </h3>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#">dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Create Project</li>
                                        </ol>
                                    </nav>
                                </div>
                                <div class="row">
                                    <div class="col-12 grid-margin stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">Create Project</h4>
                                                <p class="card-description"> Create Project </p>
                                                <form class="forms-sample" onSubmit={this.handleSubmit}>
                                                    <div class="form-group">
                                                        <label for="exampleInputName1">Project Name</label>
                                                        <input type="text" class="form-control" placeholder="Project Name" name="projectName" value={this.state.projectName} onChange={this.handleChange} />
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
                                                        <label for="exampleInputPassword4">Due Date</label>
                                                        <input type ="date" class="form-control" name="dueDate" value={this.state.dueDate} onChange={this.handleChange}  />
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

