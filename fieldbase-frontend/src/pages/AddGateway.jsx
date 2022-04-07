import React from "react";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";

function AddGateway() {
  const onAddGateway = () => {};
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
    .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, "not a vaild regex"),
});
