import React from 'react';
import { Button, Table } from 'reactstrap'

const PackageResults = ({ parcelsToFind, parcelsData, deleteParcelsToFind, getPostaResponse }) => {
  return (
    <div>
      {parcelsToFind.length > 0 && (
        <div>
          <Button onClick={deleteParcelsToFind} color="danger" size='sm'>Vymazať zásielky</Button>
          <Button onClick={getPostaResponse} color="primary" size='sm'>Vyhľadať zásielky</Button>
          <Table bordered size="sm" responsive style={{ textAlign: "center", maxWidth: "50%"}}>
            <thead>
              <tr>
                <th>Číslo Zásielky</th>
                <th>Aktuálny stav</th>
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
          </Table>
        </div>
      )}
    </div>
  );
};

export default PackageResults
