import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    parcelsToFind : [],
    parcelsData: [],
    input: ""
  }

  inputOnChange = e => {
    this.setState({ [e.target.id]: e.target.value})
  }

  addPackageNumber = e => {
    e.preventDefault();
    let parcelsArray = this.state.parcelsToFind;
    parcelsArray.push(this.state.input)
    this.setState({
      parcelToFind: parcelsArray,
      input: ''
    })
  }

  getPostaResponse = () => {
    let urlString = 'https://api.posta.sk/private/search?q=';
    this.state.parcelsToFind.forEach(element => {
      urlString += element + ','
    })
    urlString += '&m=tnt'
    fetch(urlString)
    .then(data => data.json())
    .then(response => {
      this.setState({
        parcelsData: response.parcels
      })
    })
  }

  render() {
    const { parcelsToFind, parcelsData } = this.state
    return (
      <div className="App" style={{textAlign: "-webkit-center"}}>
        <form onSubmit={this.addPackageNumber}>
          <textarea 
            placeholder="Čísla zásielok oddelené čiarkou" 
            id="input" 
            value={this.state.input} 
            onChange={this.inputOnChange} 
            style={{maxWidth: "500px"}}
          />
          <button>Pridať</button>
        </form>

        {parcelsToFind.map(parcelToFind => { 
          return <p key={parcelToFind}>{parcelToFind}</p>
        })}

        <button onClick={this.getPostaResponse}>Vyhľadať zásielky</button>
        <table>
          <thead>
            <tr>
              <td>Číslo Zásielky</td>
              <td>Aktuálny stav</td>
            </tr>
          </thead>
          <tbody>
          {parcelsData.map(parcel => {
            return <tr key={parcel.number}>
              <td>{parcel.number}</td>
              {parcel.events.length 
                ? <td>{parcel.events[parcel.events.length - 1].desc.sk}</td>
                : <td>Parcela nenájdená</td>
              }
            </tr>
          })}
          </tbody> 
        </table>
      </div>
    );
  }
}
