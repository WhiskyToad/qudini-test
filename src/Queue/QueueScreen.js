import React, { useEffect, useState } from "react";
import { fetchQueueData } from "../mockApi";
import CustomerDetails from "./components/Customer";
import TextInput from "./components/TextInput";

const QueueScreen = () => {
  const [customers, setCustomers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchQueueData()
      .then((response) => response.json())
      .then((json) => {
        setCustomers(json.queueData.queue.customersToday);
      });
  }, []);

  return (
    <>
      <TextInput
        type="text"
        placeholder={"Filter by customer name"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {customers
        .filter((customer) =>
          customer.customer.name
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
        .map((customer) => (
          <CustomerDetails
            key={customer.id}
            name={customer.customer.name}
            email={customer.customer.emailAddress}
            expectedTime={customer.expectedTime}
          />
        ))}
    </>
  );
};

export default QueueScreen;
