import React, { useCallback, useEffect, useState } from "react";
import { fetchQueueData } from "../mockApi";
import CustomerDetails from "./components/Customer";
import TextInput from "./components/TextInput";

const QueueScreen = () => {
  const [customers, setCustomers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchQueueDataCB = useCallback(async () => {
    try {
      const response = await fetchQueueData(); // Assuming you have a function for fetching data
      const json = await response.json();
      setCustomers(json.queueData.queue.customersToday);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    //initial fetch
    fetchQueueDataCB();

    // Fetch data every 30 seconds
    const intervalId = setInterval(() => {
      fetchQueueDataCB();
    }, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchQueueDataCB]);

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
