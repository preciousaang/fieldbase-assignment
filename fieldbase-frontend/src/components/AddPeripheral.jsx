import { Form, Formik, Field } from "formik";
import React from "react";
import { Error, FGroup, FLabel, IField } from "../shared/styledComps";
import api from "../api/axios";
import { converApiErrors } from "../shared/utils";

function AddPeripheral({ gatewayId, cancel, updateGateway }) {
  const onAddPeripheral = ({ vendor, status }, actions) => {
    api
      .post("/gateway/" + gatewayId + "/peripheral", { vendor, status })
      .then((res) => {
        alert("Peripheral added");
        updateGateway(res.data.gateway);
        cancel();
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          actions.setErrors(converApiErrors(err?.response?.data?.errors));
        }
        console.log(err.response);
      });
  };
  return (
    <>
      <Formik
        initialValues={{ gatewayId, vendor: "", status: "online" }}
        onSubmit={onAddPeripheral}
      >
        {({ errors, touched }) => (
          <Form>
            <FGroup>
              <FLabel>Vendor</FLabel>
              <IField name="vendor" />
              {errors.vendor && touched.vendor && (
                <Error>{errors.vendor}</Error>
              )}
            </FGroup>
            <FGroup>
              <FLabel>Status</FLabel>
              <Field as="select" name="status">
                <option value="offline">Offline</option>
                <option value="online">Online</option>
              </Field>
              {errors.status && touched.status && (
                <Error>{errors.status}</Error>
              )}
            </FGroup>
            <button type="submit">Add Peripheral</button> &nbsp;
            <button type="button" onClick={() => cancel()}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddPeripheral;
