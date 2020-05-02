import React from 'react';
import { Badge } from 'reactstrap'
const ParcelsToFind = ({ parcelsToFind, removeOne }) => {
  return (
    <tbody>
      {parcelsToFind.map((parcel, index) => {
        return (
          <tr key={index}>
            <td>{parcel}</td>
            <td>
              <Badge color="danger" size="sm" onClick={() => removeOne(index)} href="#">
                X
              </Badge>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ParcelsToFind;
