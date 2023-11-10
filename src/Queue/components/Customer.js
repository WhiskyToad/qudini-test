import React, { useEffect, useState } from "react";
import CustomerCard from "./CustomerCard";
import ProfilePicture from "./ProfilePicture";
import Name from "./Name";
import Content from "./Content";
import sha256 from "crypto-js/sha256";
import { Time, TimeTitle, TimeWrapper } from "./Time";

export default (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const encodedString = sha256(props.email);
    setImageUrl(`https://gravatar.com/avatar/${encodedString}`);
  }, [props.email]);

  useEffect(() => {
    const date = new Date(props.expectedTime);
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    setFormattedTime(date.toLocaleString("en-US", options));
  }, [props.expectedTime]);

  return (
    <CustomerCard>
      <ProfilePicture
        style={{ backgroundImage: `url(${imageUrl}`, backgroundSize: "cover" }}
      />
      <Content>
        <Name>{props.name}</Name>
        <TimeWrapper>
          <TimeTitle>Expected Time:</TimeTitle>
          <Time>{formattedTime}</Time>
        </TimeWrapper>
      </Content>
    </CustomerCard>
  );
};
