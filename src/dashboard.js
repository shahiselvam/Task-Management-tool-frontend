import React from 'react';
import Header from './header';
import Nav from './nav';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'https://taskmanagementtool.herokuapp.com/topprojects';
const API_URL1 = 'https://taskmanagementtool.herokuapp.com/CountAssigned';
const API_URL2 = 'https://taskmanagementtool.herokuapp.com/CountPending';
const API_URL3 = 'https://taskmanagementtool.herokuapp.com/CountCompleted';
const API_URL4 = 'https://taskmanagementtool.herokuapp.com/criticalTask';

export default class dashboard extends React.Component {

    constructor() {


        super();

        this.state = {

            Projects: [],
            view: false,
            Assigned: '',
            Pending: '',
            Completed: '',
            CompletedPercentage: '',
            ViewSummaery: false,
            CritiacalTask: []
        }
    }
    componentDidMount() {


        this.getProject();
    }


    getProject = async () => {

        const { data } = await axios.get(API_URL, {

            withCredentials: true
        })



        if (data.result === "Success") {


            this.setState({ Projects: data.Project })

        }

        else {

            alert(data.message)
        }

    }

    getProjectDetails = async (id) => {

        const { data } = await axios.get(`${API_URL1}/${id}`, {

            withCredentials: true
        });


        this.setState({ Assigned: data });
        this.getPending(id);

    }
    getPending = async (id) => {

        const { data } = await axios.get(`${API_URL2}/${id}`, {

            withCredentials: true
        });

        this.setState({ Pending: data });
        this.getCompleted(id);
    }


    getCompleted = async (id) => {

        const { data } = await axios.get(`${API_URL3}/${id}`, {

            withCredentials: true
        });

        this.setState({ Completed: data });

        this.getCompletedPercentage(id);
    }

    getCompletedPercentage = (id) => {

        const Assigned = this.state.Assigned;
        const Completed = this.state.Completed;

        const CompletedPercentage = ((Completed / Assigned) * 100).toFixed(2);

        this.setState({ CompletedPercentage: CompletedPercentage })

        this.getCriticaldata(id);
    }
    
    getCriticaldata = async (id) => {
        
        const { data } = await axios.get(`${API_URL4}/${id}`, {

            withCredentials: true
        });
      
        this.setState({ CritiacalTask: data.data, ViewSummaery: true })
       
    }

    hidedata = () => {

        this.setState({ ViewSummaery: false })
    }
    renderSummary = () => {

        if (this.state.ViewSummaery == true) {

            return (
                <>
                    <div class="row">
                        <div class="col-md-12 grid-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="d-sm-flex align-items-baseline report-summary-header">
                                                <h5 class="font-weight-semibold">Detailed Summary</h5> <button class="btn btn-icons border-0 p-2"><i class="icon-refresh" onClick={() => this.hidedata()}></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row report-inner-cards-wrapper">
                                        <div class=" col-md -6 col-xl report-inner-card">
                                            <div class="inner-card-text">
                                                <span class="report-title">Task Assigned</span>
                                                <h4>{this.state.Assigned}</h4>

                                            </div>
                                            <div class="inner-card-icon bg-success">
                                                <i class="icon-rocket"></i>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-xl report-inner-card">
                                            <div class="inner-card-text">
                                                <span class="report-title">Task Pending</span>
                                                <h4>{this.state.Pending}</h4>

                                            </div>
                                            <div class="inner-card-icon bg-danger">
                                                <i class="icon-briefcase"></i>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-xl report-inner-card">
                                            <div class="inner-card-text">
                                                <span class="report-title">Task Completed</span>
                                                <h4>{this.state.Completed}</h4>

                                            </div>
                                            <div class="inner-card-icon bg-warning">
                                                <i class="icon-globe-alt"></i>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-xl report-inner-card">
                                            <div class="inner-card-text">
                                                <span class="report-title">  Percentage</span>
                                                <h4>{this.state.CompletedPercentage}% </h4>

                                            </div>
                                            <div class="inner-card-icon bg-primary">
                                                <i class="icon-diamond" ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-sm-flex align-items-center mb-4">
                                        <h4 class="card-title mb-sm-0">critical Task Alert</h4>

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
                                                {this.state.CritiacalTask.map(CritiacalTasks => {

                                                    return (
                                                        <tr class="table-row" key={CritiacalTasks._id}>
                                                            <td>{CritiacalTasks.taskName}</td>
                                                            <td><div class="badge badge-danger p-2">{CritiacalTasks.taskdueDate}</div></td>
                                                            <td>{CritiacalTasks.userName}</td>
                                                            <td>{CritiacalTasks.projectName}</td>
                                                            <td><div class="badge badge-danger p-2">{CritiacalTasks.status}</div></td>

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

                    
                </>
            )
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
                                <div class="row purchace-popup">

                                </div>
                                <div class="row">
                                    <div class="col-md-12 grid-margin">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="d-sm-flex align-items-baseline report-summary-header">
                                                            <h5 class="font-weight-semibold">Report Summary</h5> <span class="ml-auto"></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row report-inner-cards-wrapper">
                                                    {this.state.Projects.map(project => {
                                                        return (
                                                            <div class=" col-md -6 col-xl report-inner-card" key={project._id}>
                                                                <div class="inner-card-text">
                                                                    <Link to={`Tasks/${project._id}`}>
                                                                        <h4> {project.projectName}</h4> </Link>
                                                                    <span class="report-title">{project.team}</span>
                                                                    <a href="#"> <span class="report-count" onClick={() => { this.getProjectDetails(project._id) }}> View Report</span></a>
                                                                </div>
                                                                <div class="inner-card-icon bg-success">
                                                                    <i class="icon-eye" onClick={() => { this.getProjectDetails(project._id) }}></i>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.renderSummary()}
                                

                               
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}