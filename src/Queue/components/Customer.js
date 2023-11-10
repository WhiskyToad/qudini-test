import React from "react";
import CustomerCard from "./CustomerCard";
import ProfilePicture from "./ProfilePicture";
import Name from "./Name";
import Content from "./Content";

export default (props) => (
  <CustomerCard>
    <ProfilePicture />
    <Content>
      <Name>{props.name}</Name>
      <div></div>
    </Content>
  </CustomerCard>
);
