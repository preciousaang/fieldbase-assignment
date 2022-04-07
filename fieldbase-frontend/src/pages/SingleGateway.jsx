import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../api/axios";
import AddPeripheral from "../components/AddPeripheral";

function SingleGateway() {
  const [gateway, setGateway] = useState(null);
  const [message, setMessage] = useState(null);
  const [addPeripheral, setAddPeripheral] = useState(false);
  const initaliateAddPeripheral = () => {
    setAddPeripheral(true);
  };
  const cancelPeripheralAdd = () => {
    setAddPeripheral(false);
  };
  const params = useParams();
  useEffect(() => {
    const controller = new AbortController();
    api
      .get("/gateway/" + params.id, { signal: controller.signal })
      .then((res) => {
        setGateway(res.data.gateway);
        setMessage(null);
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setGateway(null);
          setMessage("No gateway found");
        }
      });
    return () => {
      controller.abort();
    };
  }, [gateway, params]);
  if (message) {
    return (
      <>
        <h3>{message}</h3>
      </>
    );
  }
  if (!gateway) {
    return (
      <>
        <h5>Loading......</h5>
      </>
    );
  }
  return (
    <div>
      <h2>{gateway?.name}</h2>
      <Table>
        <tbody>
          <tr>
            <td>Serial Number</td>
            <td>{gateway?._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{gateway?.name}</td>
          </tr>
          <tr>
            <td>IP Address</td>
            <td>{gateway?.address}</td>
          </tr>
        </tbody>
      </Table>
      <hr />
      <h3>Peripherals</h3>
      {!addPeripheral && (
        <button
          onClick={() => {
            initaliateAddPeripheral();
          }}
        >
          Add Peripheral
        </button>
      )}
      {addPeripheral && (
        <AddPeripheral cancel={cancelPeripheralAdd} gatewayId={gateway?._id} />
      )}
      <Table>
        <thead>
          <tr>
            <th>UID</th>
            <th>Name</th>
            <th>Vendor</th>
            <th>Date created</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {gateway?.devices?.map((device) => (
            <tr key={device._id}>
              <td>{device.uid}</td>
              <td>{device.name}</td>
              <td>{device.vendor}</td>
              <td>{device.createdAt}</td>
              <td>{device.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SingleGateway;

const Table = styled.table`
  border: 1px solid black;
  tbody > tr > td {
    border: 1px solid black;
  }
  tbody > tr > td:first-child {
    font-weight: bold;
  }
  thead > tr > th {
    border: 1px solid black;
  }
`;
