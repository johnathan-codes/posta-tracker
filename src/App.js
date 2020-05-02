import React, { Component } from 'react';
import './App.css';
import PackageResults from './components/packageResults';
import ParcelsToFind from './components/parcelsToFind';
import { Button, Form, Table, Input, Alert } from 'reactstrap';
export default class App extends Component {
  state = {
    parcelsToFind: [],
    parcelsData: [],
    input: '',
    errorLength: ''
  };

  inputOnChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  addPackageNumber = (e) => {
    e.preventDefault();
    let { input, parcelsToFind } = this.state;

    if (this.state.input !== '') {
      let parcelsArray = parcelsToFind;
      let parseInput = input;
      parseInput = parseInput.split(',');
      parseInput.forEach((elem) => {
        parcelsArray.push(elem);
      });
      this.setState({
        parcelToFind: parcelsArray,
        input: '',
        errorLength: '',
      });
    } else {
      this.setState({
        errorLength: 'Nezadali ste číslo zásielky',
      });
    }
  };

  getPostaResponse = () => {
    let urlString = 'https://api.posta.sk/private/search?q=';
    this.state.parcelsToFind.forEach((element) => {
      urlString += element + ',';
    });
    urlString += '&m=tnt';
    fetch(urlString)
      .then((data) => data.json())
      .then((response) => {
        this.setState({
          parcelsData: response.parcels,
        });
        localStorage.setItem('parcels', this.state.parcelsToFind);
      });
  };

  deleteParcelsToFind = () => {
    this.setState({
      parcelsToFind: [],
    });
    localStorage.removeItem('parcels');
  };

  removeOne = (index) => {
    let parcelsArray = this.state.parcelsToFind;
    parcelsArray.splice(index, 1);
    this.setState({
      parcelsToFind: parcelsArray,
    });
  };

  componentDidMount = () => {
    let storageString = localStorage.getItem('parcels');

    storageString = storageString === null ? [] : storageString.split(',');
    let parcelsArray = [];

    storageString.forEach((elem) => {
      parcelsArray.push(elem);
    });

    this.setState({
      parcelsToFind: parcelsArray,
    });
  };

  render() {
    const { parcelsToFind, parcelsData, errorLength, checked } = this.state;
    console.log('App -> render -> checked', checked);
    return (
      <div className="App">
        <h2>Pošta Tracker</h2>
        <Form onSubmit={this.addPackageNumber}>
          {errorLength && <Alert color="danger">{errorLength}</Alert>}
          <Input
            type="textarea"
            placeholder="Čísla zásielok oddelené čiarkou"
            id="input"
            value={this.state.input}
            onChange={this.inputOnChange}
          />
          <br />
          <Button color="success" size="sm">
            Pridať
          </Button>
        </Form>
        <hr />
        <Table size="sm" style={{ textAlign: 'center', maxWidth: '20%' }}>
          <ParcelsToFind parcelsToFind={parcelsToFind} removeOne={this.removeOne} />
        </Table>
        <PackageResults
          parcelsData={parcelsData}
          parcelsToFind={parcelsToFind}
          deleteParcelsToFind={this.deleteParcelsToFind}
          getPostaResponse={this.getPostaResponse}
        />
      </div>
    );
  }
}
