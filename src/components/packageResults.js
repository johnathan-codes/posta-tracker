import React from 'react'
import { Table } from 'reactstrap'

const PackageResults = ({ parcelsData }) => {
  return (
    <Table bordered size="sm" responsive style={{ textAlign: 'center', maxWidth: '60%' }}>
      <thead>
        <tr>
          <th>Číslo Zásielky</th>
          <th>Aktuálny stav</th>
        </tr>
      </thead>
      <tbody>
        {parcelsData.map((parcel) => {
          return (
            <tr key={parcel.parcel + Math.random(10)}>
              <td>{parcel.parcel}</td>
              <td>{parcel.response}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default PackageResults
