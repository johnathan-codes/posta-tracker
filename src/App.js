import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    parcelsToFind: [],
    parcelsData: [],
    input: '',
    errorLength: '',
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
    const { parcelsToFind, parcelsData, errorLength } = this.state;
    return (
      <div className="App" style={{ textAlign: '-webkit-center' }}>
        <form onSubmit={this.addPackageNumber}>
          {errorLength && <p className="error">{errorLength}</p>}
          <textarea
            placeholder="Čísla zásielok oddelené čiarkou"
            id="input"
            value={this.state.input}
            onChange={this.inputOnChange}
          />
          <button>Pridať</button>
        </form>

        <table>
          <tbody>
            {parcelsToFind.map((parcelToFind, index) => {
              return (
                <tr key={index}>
                  <td>{parcelToFind}</td>
                  <td>
                    <button color="danger" onClick={this.removeOne.bind(this, index)}>
                      Vymazať
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {parcelsToFind.length > 0 && (
          <div>
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
        )}
      </div>
    );
  }
}
