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
  color: black;
`;

export const ResponsiveTable = styled.div`
  overflow-x: auto;
`;

export const IField = styled(Field)``;

export const Table = styled.table`
  border: 1px solid gray;
  border-radius: 4px;
  margin: 5px auto;

  tbody > tr > td {
    border: 1px solid gray;
  }
  tbody > tr > td:first-child {
    font-weight: bold;
    padding: 5px;
  }
  thead > tr > th {
    border: 1px solid gray;
    padding: 10px;
  }
`;
export const NavBar = styled.ul`
  li {
    display: inline;
    margin: 0 5px;
  }
  li a {
    text-decoration: none;
    background-color: teal;
    color: white;
    padding: 5px;
    border-radius: 5px;
    transition: 500ms;
    &:hover {
      background-color: white;
      color: teal;
      transition: 500ms;
    }
  }
`;
