import React from 'react';
import Header from './header';
import Nav from './nav';
import axios from 'axios';
import './style.css';

const API_URL = 'https://taskmanagementtool.herokuapp.com/Assigntask';
const API_URL1 = 'https://taskmanagementtool.herokuapp.com/projects';
export default class Tasks extends React.Component {

    constructor() {
        super();

        this.state = {
            Tasks: [],
            projectId: '',
            projectName: '',
            team: '',
            Editstatus: false,
            taskid: '',
            status: '',
            key: '',
            taskValue: []
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

        }

        else {

            alert(data.message);
        }
    }


    renderInputfield = (status) => {
        
        if (this.state.Editstatus == true) {
            return (<div><select class="form-control form-control-sm" name="status" value={this.state.status} onChange={this.handleChange}>
                <option value="" disabled selected hidden>Select Status</option>
                <option value="Assigned">Assigned </option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select></div>)
        }


        else {
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

    }

    renderEditfield = () => {
        if (this.state.Editstatus == true) {

            return (<div><i class="fa fa-trash" onClick={ () => this.Updatestatus()}>Update</i></div>)
        }
        else {

            return (<div><i class="fa fa-trash">Edit</i></div>)
        }

    }

    editStatus = (id) => {



        this.setState({ taskid: id });
        this.setState({ Editstatus: !this.state.Editstatus });

    }

    handleChange = ({ target: { name, value } }) => {

        this.setState({ [name]: value });

    }


    Updatestatus = async () => {

       const id = this.state.taskid;
       const { data } =  await axios.put(`${API_URL}/${id}`, {

            status: this.state.status
        }
        ,{

            withCredentials: true
        }
        )
        if(data.result == "Success"){
            
            this.getTasks(this.state.projectId);
        }
        
        this.setState({ status: '', taskid: '' });
       
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
                                    <h3 class="page-title">Tasks</h3>
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb">
                                            <li class="breadcrumb-item"><a href="#">dashboard</a></li>
                                            <li class="breadcrumb-item active" aria-current="page">Tasks</li>
                                        </ol>
                                    </nav>
                                </div>

                                <div class="row">
                                    <div class="col-md-12 grid-margin stretch-card">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-sm-flex align-items-center mb-4">
                                                    <h4 class="card-title mb-sm-0">Tasks / {this.state.projectName} / {this.state.team}</h4>

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
                                                                <th class="font-weight-bold">Edit Status</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.state.Tasks.map(task => {

                                                                return (
                                                                    <tr class="table-row" key={task._id}>
                                                                        <td>{task.taskName}</td>
                                                                        <td>{task.taskdueDate}</td>
                                                                        <td>{task.userName}</td>
                                                                        <td>{task.projectName}</td>

                                                                        <td>{this.renderInputfield(task.status)}</td>


                                                                        <td><i class="fa fa-trash" onClick={() => this.editStatus(task._id)}>{this.renderEditfield()}</i></td>
                                                                       
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