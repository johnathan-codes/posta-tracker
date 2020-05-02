import React from 'react';
import { Button, Table } from 'reactstrap'

const PackageResults = ({ parcelsToFind, parcelsData, deleteParcelsToFind, getPostaResponse }) => {
  return (
    <div>
      {parcelsToFind.length > 0 && (
        <div>
          <Button onClick={deleteParcelsToFind} color="danger" size='sm'>Vymazať zásielky</Button>
          <Button onClick={getPostaResponse} color="primary" size='sm'>Vyhľadať zásielky</Button>
          <Table bordered size="sm" responsive style={{ textAlign: "center", maxWidth: "60%"}}>
            <thead>
              <tr>
                <th>Číslo Zásielky</th>
                <th>Aktuálny stav</th>
              </tr>
            </thead>
            <tbody>
              {parcelsData.map((parcel) => {
                let posta = "Zásielka nenájdená"
                if(parcel.events.length > 0 && parcel.events[parcel.events.length - 1].post !== undefined) {
                  posta = "Zásielka uložená na pošte: " + parcel.events[parcel.events.length - 1].post.name
                } else if (parcel.events.length > 0) {
                  posta = parcel.events[parcel.events.length - 1].desc.sk
                }

                return (
                  <tr key={parcel.number}>
                    <td>{parcel.number}</td>
                    <td>{posta}</td>
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
