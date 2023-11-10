import React, { useEffect, useState } from "react";
import CustomerCard from "./CustomerCard";
import ProfilePicture from "./ProfilePicture";
import Name from "./Name";
import Content from "./Content";
import sha256 from "crypto-js/sha256";

export default (props) => {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const encodedString = sha256(props.email);
    setImageUrl(`https://gravatar.com/avatar/${encodedString}`);
  }, [props.email]);
  return (
    <CustomerCard>
      <ProfilePicture
        style={{ backgroundImage: `url(${imageUrl}`, backgroundSize: "cover" }}
      />
      <Content>
        <Name>{props.name}</Name>
        <div></div>
      </Content>
    </CustomerCard>
  );
};
