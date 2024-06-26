import React from "react";
import { Button as MuiButton } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(MuiButton)`
  border-radius: 5em;
  box-shadow: none;
  margin-top: 8px;
  &:hover {
    background-color: darkred;
  }
`;

export const Button = ({ ...props }) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
