import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ResponsiveTable, Table } from "../shared/styledComps";
import api from "../api/axios";

function Gateways() {
  const [gateways, setGateways] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    api
      .get("/gateways", { signal: controller.signal })
      .then((res) => {
        setGateways(res?.data?.gateways);
      })
      .catch((err) => {
        console.log(err.response);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <ResponsiveTable>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>IP address</th>
              <th>Peripheral Device count</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gateways.map((gateway) => (
              <tr key={gateway._id}>
                <td>{gateway.name}</td>
                <td>{gateway.address}</td>
                <td>{gateway?.devices?.length}</td>
                <td>
                  <Link to={`/gateway/${gateway._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ResponsiveTable>
    </>
  );
}

export default Gateways;
