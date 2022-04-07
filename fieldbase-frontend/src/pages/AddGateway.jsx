import React from "react";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import api from "../api/axios";
import { converApiErrors } from "../shared/utils";
import { useNavigate } from "react-router-dom";

function AddGateway() {
  const navigate = useNavigate();
  const onAddGateway = ({ name, address }, actions) => {
    api
      .post("/add", { name, address })
      .then((res) => {
        alert("Ok");
        actions.resetForm();
        console.log(res?.data?.gateway);
        navigate("/gateway/" + res.data.gateway._id);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          actions.setErrors(converApiErrors(err.response.data.errors));
        }
      });
  };
  return (
    <>
      <Header>Add Gateway</Header>
      <Formik
        validationSchema={schema}
        onSubmit={onAddGateway}
        initialValues={{ name: "", address: "" }}
      >
        {({ errors, touched }) => (
          <Form>
            <FGroup>
              <FLabel htmlFor="name">Name</FLabel>
              <IField name="name" id="name" />
              {errors.name && touched.name && <Error>{errors.name}</Error>}
            </FGroup>
            <FGroup>
              <FLabel htmlFor="address">IPV4 Address</FLabel>
              <IField name="address" id="address" />
              {errors.address && touched.address && (
                <Error>{errors.address}</Error>
              )}
            </FGroup>
            <button type="submit">Add</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddGateway;

const Header = styled.h2`
  color: red;
`;

const IField = styled(Field)``;

const FGroup = styled.div`
  display: block;
  margin: 15px 0;
`;
const FLabel = styled.label`
  display: block;
`;
const Error = styled.p`
  color: red;
`;

const schema = yup.object().shape({
  name: yup.string().required("Required Field"),
  address: yup
    .string()
    .required("Required field")
    .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, "not a vaild ip address"),
});
