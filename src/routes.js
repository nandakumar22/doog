import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Menu from './menu';
import { Icon } from 'native-base';
import MyProfile from './myprofile';
import Signup from './signup';
import Login from './login';
import   SignupInd from './signup_indv';
import   SignupGrp  from './signup_nonpro';
import   Dash  from './dash';
import   Forgot from './forgot';
// import   Log from './log';


const MenuIcon = () => {

    return (
        <Icon name='menu' size={30} />
    )
}
const Routes = () => (
    <Router>
        <Scene key="root">

            <Scene key="login" initial={true} component={Login} hideNavBar={true} /> 

            <Scene key="frgt"  component={Forgot} hideNavBar={false} /> 
            {/* <Scene key="lgg"  component={Log} hideNavBar={true} />  */}

            <Scene key="up"  component={Signup} hideNavBar={false} /> 
            <Scene key="indv"  component={SignupInd} hideNavBar={false} /> 
            <Scene key="grp"  component={SignupGrp} hideNavBar={false} /> 



            <Scene key ="drawer" drawer contentComponent={Menu} drawerIcon={MenuIcon}  drawerWidt={250} hideNavBar>
  <Scene key="dd" component={Dash}/>
                <Scene key="myPf" component={MyProfile}/>


            </Scene>


            </Scene>
    </Router>
)

export default Routes