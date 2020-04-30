import React, { Component } from 'react';
import './App.css';

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

    let parcelCount = input.split(',');
    parcelCount = parcelCount.length;
    console.log('App -> addPackageNumber -> parcelCount', parcelCount)

    if (this.state.input !== '' && input.replace(',', '').length === parcelCount * 13) {
      let parcelsArray = parcelsToFind;
      let parseInput = input;
      parseInput = parseInput.split(',');
      parseInput.forEach((elem) => {
        parcelsArray.push(elem);
      });
      this.setState({
        parcelToFind: parcelsArray,
        input: '',
        errorLength: ''
      });
    } else {
      this.setState({
        errorLength: 'Číslo zásielky má 13 znakov'
      })
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
    const { parcelsToFind, parcelsData, errorLength } = this.state;
    return (
      <div className="App" style={{ textAlign: '-webkit-center' }}>
        <form onSubmit={this.addPackageNumber}>
          {errorLength && <p style={{color: 'red'}}>{errorLength}</p>}
          <textarea
            placeholder="Čísla zásielok oddelené čiarkou"
            id="input"
            value={this.state.input}
            onChange={this.inputOnChange}
            style={{ maxWidth: '500px' }}
          />
          <button>Pridať</button>
        </form>

        {parcelsToFind.map((parcelToFind) => {
          return <p key={parcelToFind}>{parcelToFind}</p>;
        })}
        <button onClick={this.deleteParcelsToFind}>Vymazať zásielky</button>
        <button onClick={this.getPostaResponse}>Vyhľadať zásielky</button>
        <table>
          <thead>
            <tr>
              <td>Číslo Zásielky</td>
              <td>Aktuálny stav</td>
            </tr>
          </thead>
          <tbody>
            {parcelsData.map((parcel) => {
              return (
                <tr key={parcel.number}>
                  <td>{parcel.number}</td>
                  {parcel.events.length ? (
                    <td>{parcel.events[parcel.events.length - 1].desc.sk}</td>
                  ) : (
                    <td>Parcela nenájdená</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
