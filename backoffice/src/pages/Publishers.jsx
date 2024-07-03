
import StatsBar from "../components/StatsBar";
import TableCondensed from "../components/TableCondensed";
import React, { useState, useEffect } from 'react';

const na = [{name: "Total Subscribers", stat: "71,897"},{name: "Total Subscribers", stat: "71,897"},{name: "Total Subscribers", stat: "71,897"}]
const headers = [
  { label: "ID", key: "id", dataType: "number" },
  { label: "Name", key: "name", dataType: "string" },
  { label: "Payment Info", key: "paymentInfo", dataType:"action", action:"/publishers/?paymentInfo={actionKey}", actionKey:"id" },
  // { label: "Tax Number", key: "taxNumber", dataType: "string" },
  // { label: "Bank", key: "bank", dataType: "string" },
  // { label: "Account Type", key: "accountType", dataType: "string" },
  // { label: "Credit Limit", key: "creditLimit", dataType: "money" },
  // { label: "Bank Account", key: "bankAccount", dataType: "string" },
  // { label: "Term", key: "term", dataType: "enum" },  // Assuming Term is an enum (net 30, net 60, net 90, prepaid)
  // { label: "Contact", key: "contact", dataType: "string" },
  // { label: "Email", key: "email", dataType: "string" },
  // { label: "Phone", key: "phone", dataType: "string" },
  // { label: "Address", key: "address", dataType: "string" },
  { label: "Status", key: "status", dataType: "enum" },  // Assuming AccountStatus is an enum
  { label: "Created At", key: "createdAt", dataType: "dateMMDDYYYYHHmm" },  // Assuming formatted date/time
  { label: "Updated At", key: "updatedAt", dataType: "dateMMDDYYYYHHmm" },  // Assuming formatted date/time
  { label: "Timezone", key: "timezone", dataType: "string" },
  { label: "Assets", key: "assets", dataType: "action", action: "/assets/{actionKey}", actionKey: "id" },
  // Add more headers as needed
];

export default function Publishers() {
    const [campaignData, setAdvertisersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/ad');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAdvertisersData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
    return (
    <>
        <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Advertisers</h2>
        {/* <StatsBar stats={na}  /> */}
        <TableCondensed headers={headers} data={campaignData}  />
        {/* <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0 space-x-3">
        <StatCard item={na}/>
        <StatCard item={na}/>
        <StatCard item={na}/>        
        </dl> */}

    </>
);
  }
