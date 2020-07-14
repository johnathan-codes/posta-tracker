import React from 'react'
import { Badge } from 'reactstrap'

const ParcelsToFind = ({ parcelsToFind }) => {
  return (
    <tbody>
      {parcelsToFind.map((parcel, index) => {
        return (
          <tr key={index}>
            <td>{parcel.parcel}</td>
          </tr>
        )
      })}
    </tbody>
  )
}

export default ParcelsToFind
