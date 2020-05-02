import React from 'react';

const ParcelsToFind = ({ parcelsToFind, removeOne }) => {
  return (
    <tbody>
      {parcelsToFind.map((parcel, index) => {
        return (
          <tr key={index}>
            <td>{parcel}</td>
            <td>
              <button color="danger" onClick={() => removeOne(index)}>
                Vymazať
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ParcelsToFind;
