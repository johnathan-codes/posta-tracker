import React, { useState, useEffect } from 'react'
import './App.css'
import PackageResults from './components/PackageResults'
import ParcelsToFind from './components/ParcelsToFind'
import { Button, Form, Table, Input, Alert } from 'reactstrap'

const App = () => {
  const [parcelsToFind, setParcelsToFind] = useState([])
  const [checked, setChecked] = useState(false)
  const [input, setInput] = useState('')
  const [errorLength, setErrorLength] = useState('')

  const inputOnChange = (e) => {
    setInput(e.target.value)
  }

  const addPackageNumber = (e) => {
    e.preventDefault()

    if (input !== '') {
      let parseInput = input
      parseInput = parseInput.split(',')
      parseInput.forEach((elem) => {
        let newObj = {
          parcel: elem,
          response: '',
        }
        setParcelsToFind((prevParcelsToFind) => [...prevParcelsToFind, newObj])
      })

      setInput('')
      setErrorLength('')
    } else {
      setErrorLength('Nezadali ste číslo zásielky')
    }
  }

  const formatResponse = (item) => {
    if (item.events.length > 0 && item.events[item.events.length - 1].post !== undefined) {
      return 'Zásielka uložená na pošte: ' + item.events[item.events.length - 1].post.name
    } else if (item.events.length > 0) {
      return item.events[item.events.length - 1].desc.sk
    } else return 'Zásielka nenájdená'
  }

  const getPostaResponse = () => {
    let urlString = 'https://api.posta.sk/private/search?q='
    parcelsToFind.forEach((element) => {
      urlString += element.parcel + ','
    })
    urlString += '&m=tnt'
    fetch(urlString)
      .then((data) => data.json())
      .then((response) => {
        let tempArray = []
        response.parcels.forEach((item) => {
          let temp = parcelsToFind.find((elem) => {
            return elem.parcel === item.number
          })

          temp.response = formatResponse(item)
          tempArray.push(temp)
        })
        setParcelsToFind(tempArray)
        setChecked(true)
        localStorage.setItem('parcels', JSON.stringify(parcelsToFind))
      })
  }

  const deleteParcelsToFind = () => {
    setParcelsToFind([])
    setChecked(false)
    localStorage.removeItem('parcels')
  }

  useEffect(() => {
    let storageString = localStorage.getItem('parcels')

    storageString = storageString === null ? [] : JSON.parse(storageString)
    let parcelsArray = []

    storageString.forEach((elem) => {
      parcelsArray.push(elem)
    })

    setParcelsToFind(parcelsArray)
  }, [])

  return (
    <div className="App">
      <h2>Pošta Tracker</h2>
      <Form onSubmit={addPackageNumber}>
        {errorLength && <Alert color="danger">{errorLength}</Alert>}
        <Input
          type="textarea"
          placeholder="Čísla zásielok oddelené čiarkou"
          id="input"
          value={input}
          onChange={inputOnChange}
        />
        <br />
        <Button color="success" size="sm">
          Pridať
        </Button>
      </Form>
      <hr />

      {parcelsToFind.length > 0 && (
        <div>
          <Table size="sm" style={{ textAlign: 'center', maxWidth: '50%' }}>
            <ParcelsToFind parcelsToFind={parcelsToFind} />
            {/* <ParcelsToFind parcelsToFind={parcelsToFind}  /> removeOne={removeOne} */}
          </Table>
          <Button onClick={deleteParcelsToFind} color="danger" size="sm">
            Vymazať zásielky
          </Button>
          <Button onClick={getPostaResponse} color="primary" size="sm">
            Vyhľadať zásielky
          </Button>
          {checked && <PackageResults parcelsData={parcelsToFind} />}
        </div>
      )}
    </div>
  )
}

export default App
