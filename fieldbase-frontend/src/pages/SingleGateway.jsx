import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";
import AddPeripheral from "../components/AddPeripheral";
import moment from "moment";
import { Error, ResponsiveTable, Success, Table } from "../shared/styledComps";

function SingleGateway() {
  const [gateway, setGateway] = useState(null);
  const [message, setMessage] = useState(null);
  const [addPeripheral, setAddPeripheral] = useState(false);
  const initaliateAddPeripheral = () => {
    setAddPeripheral(true);
  };
  const changeStatus = (id) => {
    api
      .post("/gateway/" + params.id + "/update-peripheral", { id })
      .then((res) => {
        setGateway(res?.data?.gateway);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const removePeripheral = (id) => {
    if (window.confirm("Are you sure?")) {
      api
        .post("/gateway/" + params.id + "/remove-peripheral", { id })
        .then((res) => {
          setGateway(res?.data?.gateway);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
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
  }, [params]);
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
        <AddPeripheral
          cancel={cancelPeripheralAdd}
          gatewayId={gateway?._id}
          updateGateway={(gateway) => {
            setGateway(gateway);
          }}
        />
      )}
      <ResponsiveTable>
        <Table>
          <thead>
            <tr>
              <th>UID</th>
              <th>Vendor</th>
              <th>Date created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {gateway?.devices?.map((device) => (
              <tr key={device._id}>
                <td>{device?.uid}</td>
                <td>{device?.vendor}</td>
                <td>
                  {device?.createdAt &&
                    moment(device?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </td>
                <td>
                  {device?.status === "online" ? (
                    <Success>{device?.status}</Success>
                  ) : (
                    <Error>{device?.status}</Error>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => changeStatus(device?._id)}
                    type="button"
                  >
                    {device.status === "offline" ? (
                      <>Set online</>
                    ) : (
                      <>Set offline</>
                    )}
                  </button>
                  &nbsp;
                  <button
                    onClick={() => removePeripheral(device._id)}
                    type="button"
                  >
                    Remove from gateway
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ResponsiveTable>
    </div>
  );
}

export default SingleGateway;
