import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Alert, Form, Navbar, Nav} from "react-bootstrap"
import "./dash.css";
// import Navigation from "../layout/Navbar"
import axios from "axios";




class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  

  
  state={
    telephone:'',
    date:'',
    address:'',
    city:'',
    state:'',
    zip:'',
    tripEndDateTime:''
    
    
  }

  

  handleChange=(event)=>{
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    
    this.setState({
      [name]: value
    })
  }
  submit = (event)=>{

    event.preventDefault();

    const payload = {
        
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        address: this.state.address,
        tripEndDateTime: this.state.tripEndDateTime,
      

    }

    axios({
        // url: '/api/trips',
        url: `/api/users/trips/${this.state.userid}`,
        method: "POST",
        data: payload

    })
    .then(()=>{
        console.log('Data has been sent to the server');
    })
    .catch(()=>{
        console.log('Internal server error')
    })
}
  
componentDidMount(){

  this.setState({userid: this.props.auth.user.id})
}
  render() {
    const { user } = this.props.auth;

    return (
      <>
      <Navbar expand="lg" bg="warning">
      <img className="pic" src={require('../../images/logo.svg')} alt="dawn pic" />
      <Navbar.Brand href="/" className="brand"> Get Lost</Navbar.Brand>
      <Navbar.Toggle className="toggler" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav mr-auto">
      <Nav className="ml-auto">
      <b>Hey there,</b> {user.name.split(" ")[0]}!
      <Button variant="info" onClick={this.onLogoutClick} className="btn btn-lg logout">Logout</Button>
      {/* <Nav.Link className="navItem" href="/register">Register</Nav.Link>
      <Nav.Link className="navItem" href="/login">Log In</Nav.Link> */}
    </Nav>
  </Navbar.Collapse>
</Navbar>
      <Container className="pt-3">
        <div className="card text-center">
          <h4>Current Trip: </h4>
          <h5>(Alarm Dispatch Location)</h5>
          <h5>(Expected Arrival Time)</h5>
          <Alert variant="danger">Arrived Safe - Cancel Alarm</Alert>
          <hr />

          <h4>New Alarm (Location and Time)</h4>
          <Form>
            <Form.Group className="px-1">
            <Form.Control 
            type="address"
            name="address" 
            placeholder="Address"
            onChange={this.handleChange}/>
            </Form.Group>

            <Form.Group className="px-1">
            <Form.Control 
            type="city"
            name="city"
            placeholder="City"
            onChange={this.handleChange} />
            </Form.Group>

            <Form.Group className="px-1">
            <Form.Control 
            type="state" 
            name="state"
            placeholder="State"
            
            onChange={this.handleChange} />
            </Form.Group>

            <Form.Group className="px-1">
            <Form.Control 
            type="zipcode" 
            name="zip"
            placeholder="Zipcode"
            
            onChange={this.handleChange} />
            </Form.Group>

            <Form.Group className="px-1">
            <Form.Control 
            type="arrival" 
            name="tripEndDateTime"
            placeholder="Expected Arrival"
            
            onChange={this.handleChange}
            />
            </Form.Group>

            <Form.Group className="px-1">
            <Form.Control 
            type="PIN" 
            name="pin"
            placeholder="PIN code"
            
            onChange={this.handleChange} />
            </Form.Group>
            </Form>

            <Button onClick={this.submit} className="btn btn-warning">Submit</Button>

        </div>
      </Container>
      </>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);






// <div className="landing-copy">
// <h4 className>
//   <b>Hey there,</b> {user.name.split(" ")[0]}!
//   <p className="">
//     You're logged in!
//   </p>
// </h4>
// <Button variant="info"
// onClick={this.onLogoutClick} className="btn btn-lg logout">Logout
// </Button>
// </div>