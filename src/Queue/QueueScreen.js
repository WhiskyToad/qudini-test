import React, { useEffect, useState } from "react";
import { fetchQueueData } from "../mockApi";
import CustomerDetails from "./components/Customer";

const QueueScreen = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchQueueData()
      .then((response) => response.json())
      .then((json) => {
        setCustomers(json.queueData.queue.customersToday);
      });
  }, []);

  return (
    <>
      {customers.map((customer) => (
        <CustomerDetails key={customer.id} name={customer.customer.name} />
      ))}
    </>
  );
};

export default QueueScreen;
