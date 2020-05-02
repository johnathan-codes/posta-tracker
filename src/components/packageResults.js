import React from 'react';

const PackageResults = ({ parcelsToFind, parcelsData, deleteParcelsToFind, getPostaResponse }) => {
  return (
    <div>
      {parcelsToFind.length > 0 && (
        <div>
          <button onClick={deleteParcelsToFind}>Vymazať zásielky</button>
          <button onClick={getPostaResponse}>Vyhľadať zásielky</button>
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
};

export default PackageResults
