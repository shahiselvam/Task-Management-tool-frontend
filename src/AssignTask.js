import React from 'react';
import Header from './header';
import Nav from './nav';
import axios from 'axios';
import './style.css'

const API_URL = 'https://taskmanagementtool.herokuapp.com/Assigntask';
const API_URL1 = 'https://taskmanagementtool.herokuapp.com/projects'
const API_URL2 = 'https://taskmanagementtool.herokuapp.com/employeeteam'

export default class Assigntask extends React.Component {

    constructor() {
        super();

        this.state = {

            taskName: '',
            projectId: '',
            projectName: '',
            userId: '',
            team: '',
            taskdueDate: Date,
            Projects: [],
            User: [],
            Tasks: []
        }

    }

    componentDidMount() {

        const id = this.props.match.params.id;
        this.setState({ projectId: id });
        this.getProject(id);
        this.getTasks(id);

    }

    getTasks = async (id) => {

        const { data } = await axios.get(`${API_URL}/${id}`, {

            withCredentials: true
        })
        console.log(data);
        if (data.result == "Success") {

            this.setState({ Tasks: data.task });

        }

    }

    getProject = async (id) => {

        const { data } = await axios.get(`${API_URL1}/${id}`, {

            withCredentials: true
        })



        if (data.result == "Success") {

            this.setState({ projectName: data.project.projectName, team: data.project.team });
            this.getuser();
        }

        else {

            alert(data.message);
        }
    }

    getuser = async () => {

        const team = this.state.team;

        const { data } = await axios.get(`${API_URL2}/${team}`, {

            withCredentials: true
        })

        this.setState({ User: data })

    }


    handleChange = ({ target: { name, value } }) => {


        this.setState({ [name]: value });
    }


    handleSubmit = (event) => {

        event.preventDefault();

        this.createTask();
    }

    createTask = async () => {
        debugger
        const { data } = await axios.post(API_URL, {

            taskName: this.state.taskName,
            projectId: this.state.projectId,
            projectName: this.state.projectName,
            userId: this.state.userId,
            taskdueDate: this.state.taskdueDate,
            team: this.state.team


        },
            {

                withCredentials: true

            })

        if (data.result == "Success") {

            alert(data.message);
        }

        else {

            alert(data.message);
        }


        this.setState({ taskName: '', userId: '', taskdueDate: Date })
    }

    renderInputfield = (status) => {

        if (status == "Assigned") {

            return (<div class="badge badge-warning p-2">{status}</div>)
        }

        else if (status == "Pending") {

            return (<div class="badge badge-danger p-2">{status}</div>)
        }
        else {

            return (<div class="badge badge-success p-2">{status}</div>)
        }

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
                                    <h3 class="page-title"> Assign task  </h3>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#">dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Assign task</li>
                                        </ol>
                                    </nav>
                                </div>
                                <div class="row">
                                    <div class="col-12 grid-margin stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">{this.state.projectName} / {this.state.team}</h4>
                                                <p class="card-description"> Assign task</p>
                                                <form class="forms-sample" onSubmit={this.handleSubmit}>
                                                    <div class="form-group">
                                                        <label for="exampleInputName1">Task Name</label>
                                                        <input type="text" class="form-control" placeholder="Task Name" name="taskName" value={this.state.taskName} onChange={this.handleChange} />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleInputPassword4">User</label>
                                                        <select class="form-control form-control-sm" name="userId" value={this.state.userId} onChange={this.handleChange}>
                                                            <option value="" disabled selected hidden>Select User</option>
                                                            {this.state.User.map(users => {
                                                                return (
                                                                    <option value={users._id}>{users.FirstName}</option>
                                                                )
                                                            })}


                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="exampleInputPassword4">Due Date</label>
                                                        <input type="date" class="form-control" name="taskdueDate" value={this.state.taskdueDate} onChange={this.handleChange} />
                                                    </div>
                                                    <button type="submit" class="btn btn-primary mr-2">Submit</button>

                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="row">
                                    <div class="col-md-12 grid-margin stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-sm-flex align-items-center mb-4">
                                                    <h4 class="card-title mb-sm-0">Tasks</h4>

                                                </div>
                                                <div class="table-responsive border rounded p-1">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th class="font-weight-bold">Task Name</th>
                                                                <th class="font-weight-bold">Due Date</th>
                                                                <th class="font-weight-bold">Assigned To</th>
                                                                <th class="font-weight-bold">Project Name</th>
                                                                <th class="font-weight-bold">Status</th>
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.Tasks.map(task => {

                                                                return (
                                                                    <tr key={task._id}>
                                                                        <td>{task.taskName}</td>
                                                                        <td>{task.taskdueDate}</td>
                                                                        <td>{task.userName}</td>
                                                                        <td>{task.projectName}</td>
                                                                        <td>{this.renderInputfield(task.status)}</td>
                                                                        
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
                </div>
            </>

        )
    }

}
