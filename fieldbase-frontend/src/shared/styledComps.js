import styled from "styled-components";
import { Field } from "formik";
export const FGroup = styled.div`
  display: block;
  margin: 15px 0;
`;
export const FLabel = styled.label`
  display: block;
`;
export const Error = styled.p`
  color: red;
  font-size: 80%;
`;

export const Header = styled.h2`
  color: red;
`;

export const ResponsiveTable = styled.div`
  overflow-x: auto;
`;

export const IField = styled(Field)``;

export const Table = styled.table`
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
