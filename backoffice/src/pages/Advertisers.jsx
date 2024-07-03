import StatsBar from "../components/StatsBar";
import TableCondensed from "../components/TableCondensed";
import React, { useState, useEffect } from 'react';

const statsHeaders = [
  {name: "Total Advertisers", dataType:"number", key: "activeadvertisers"},
  {name: "Active Campaigns", dataType:"number", key: "activecampaigns"},
  {name: "Total Monthly Budget", dataType:"money", key: "totalmonthlybudget"},
  {name: "Average Max Bid", dataType:"money", key: "averagemaxbid"}]
const tableHeaders = [
    { label: "ID", key: "id", dataType: "number" },
    { label: "Name", key: "name", dataType: "string" },
    { label: "Type", key: "type", dataType: "enum" },  // Assuming AdvertiserType is an enum
    { label: "Email", key: "email", dataType: "string" },
    { label: "Phone", key: "phone", dataType: "string" },
    { label: "Address", key: "address", dataType: "string" },
    { label: "Tax Number", key: "taxNumber", dataType: "string" },
    { label: "Term", key: "term", dataType: "enum" },  // Assuming Term is an enum
    { label: "Status", key: "status", dataType: "enum" },  // Assuming AccountStatus is an enum
    { label: "Max Term Credit", key: "maxTermCredit", dataType: "money" },
    { label: "Campaigns", key: "campaigns", dataType: "action", action: "/campaigns/{actionKey}", actionKey: "id" },
    { label: "Invoices", key: "invoices", dataType: "action", action: "/invoices/{actionKey}", actionKey: "id" },
];
export default function Advertisers() {
    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataHelper = {};
        const advertisers = await fetch('http://localhost:3000/advertiser');
        const stats = await fetch('http://localhost:3000/advertiser/stats/all');
        if (!advertisers.ok) {
          throw new Error('Network response was not ok');
        }
        const advertisersJSON = await advertisers.json();
        const statsJSON = await stats.json();
        dataHelper.tableData = advertisersJSON;
        dataHelper.statsData = statsJSON[0];
        setData(dataHelper);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
    return (
    <>
        <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Advertisers</h2>        
        <StatsBar headers={statsHeaders} stats={data.statsData}  />
        <TableCondensed headers={tableHeaders} data={data.tableData}  />
    </>
);
  }
