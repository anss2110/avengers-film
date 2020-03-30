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
    axios
      .get("http://omdbapi.com/?apikey=57f95c5c&s=avenger")
      .then(response =>
        response.data.Search.map(filmList => ({
          title: `${filmList.Title}`,
          year: `${filmList.Year}`,
          imdbID: `${filmList.imdbID}`,
          type: `${filmList.Type}`,
          poster: `${filmList.Poster}`,
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
            <div className='container-fluid'>
              <Row>
                {!isLoading ? (
                  listOfFilm.map(filmList => {
                    const { title, year, imdbID, type, poster } = filmList;
                    return(
                      <>
                        <Card className='shadow ml-2 mr-2 mb-4' style={{maxWidth:250}}>
                          <Card.Img variant='top' src={poster} />
                          <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                              Year : {year} <br />
                              Type : {type} <br />
                            </Card.Text>
                            <Button variant='primary' href={'/' + imdbID}>Check Now!</Button>
                          </Card.Body>
                        </Card>
                      </>
                    )
                  })
                )
                :
                <p>Loading...</p>
                }
              </Row>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default Index