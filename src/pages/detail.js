import React from 'react';
import '../App.scss';
import logo from '../assets/logo.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Image, Card, Container, Row, Col, Media, CardDeck } from 'react-bootstrap';
import hacktiv8 from '../assets/hacktiv8.jpg';
import photoProfile from '../assets/photo-profile.jpeg';
import axios from 'axios';

class Index extends React.Component {
  state = {
    users: [],
    isLoading: true,
    errors: null
  };

  getFilm() {
    const { id } = this.props.match.params  
    axios
      .get("http://omdbapi.com/?apikey=57f95c5c&i=" + id)
      .then(response =>
        response.data.Search.map(filmList => ({
          title: `${filmList.Title}`,
          year: `${filmList.Year}`,
          rated: `${filmList.Rated}`,
          released: `${filmList.Released}`,
          runtime: `${filmList.Runtime}`,
          genre: `${filmList.Genre}`,

        }))
      )
      .then(listOfFilm => {
        console.log("list film ===> " + JSON.stringify(listOfFilm));
        this.setState({
          listOfFilm,
          isLoading: false
        })
      })
      .catch(error => {
        console.log("error lah kambing")
        this.setState({ 
          error, 
          isLoading: false 
        })
      });
  }

  componentDidMount() {
    this.getFilm();
  }

  render() {
    const { isLoading, listOfFilm } = this.state;
    return (
      <div className='fill-body'>
        <div>
          <Navbar className='navbar shadow navbar-fixed-top'>
            <Container>
              <Navbar.Brand href="#home">
                <img 
                  src={logo} 
                  alt='Logo' 
                  width="150"
                  className="d-inline-block align-top"
                />
              </Navbar.Brand>
              <Navbar.Toggle className='text white' aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link className='text white' href="#home">Create Meetup</Nav.Link>
                  <Nav.Link className='text white' href="#link">Explore</Nav.Link>
                </Nav>
                <Form inline>
                  <Button variant='light' id='shadow'>Login</Button>
                </Form>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className='page-column'>
          <Container className='mb-5'>
          </Container>
        </div>
      </div>
    );
  }
}

export default Index