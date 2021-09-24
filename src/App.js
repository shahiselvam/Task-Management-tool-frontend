import React from 'react';
import {BrowserRouter , Route , Switch ,Redirect} from 'react-router-dom';
import dashboard from './dashboard';
import Registration from './registration';
import login from './login';
import forgetPassword from './forgetpassword';
import reset from './Resetpassword';
import createUser from './Createuser';
import viewUser from './Viewuser';
import editUser from './edituser';
import createProject from './createproject';
import viewProjects from './viewProject';
import Assigntask from './AssignTask';
import Tasks from './Tasks';

function App() {

  return (
    <>
     <BrowserRouter>   
     <Switch>
     <Route path="/login" component={login} />
     <Route path="/Registration" component={Registration} />
     <Route path="/dashboard" component={dashboard} />
     <Route path="/forgetPassword" component={forgetPassword} />
     <Route path="/reset/:token" component={reset} />
     <Route path="/createUser" component={createUser} />
     <Route path="/editUser/:id" component={editUser} />
     <Route path="/viewUser" component={viewUser} />
     <Route path="/createProject" component={createProject} />
     <Route path="/viewproject" component={viewProjects} />
     <Route path="/Assigntask/:id" component={Assigntask} />
     <Route path="/Tasks/:id" component={Tasks} />
     <Route exact path="/">
     <Redirect to="/login" />
   </Route>
    
    </Switch>
    </BrowserRouter>
   </>
  )
}
export default App;