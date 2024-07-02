
import StatsBar from "../components/StatsBar";
import TableCondensed from "../components/TableCondensed";
import React, { useState, useEffect } from 'react';

const na = [{name: "Total Subscribers", stat: "71,897"},{name: "Total Subscribers", stat: "71,897"},{name: "Total Subscribers", stat: "71,897"}]
const headers = [
  { label: "ID", key: "id", dataType: "number" },
  { label: "Advertiser ID", key: "advertiserId", dataType: "number" },
  { label: "Name", key: "name", dataType: "string" },
  { label: "Brand", key: "brand", dataType: "string" },
  { label: "Max Bid", key: "maxBid", dataType: "money" },
  { label: "Daily Budget", key: "dailyBudget", dataType: "money" },
  { label: "Monthly Budget", key: "monthlyBudget", dataType: "money" },
  { label: "Status", key: "status", dataType: "enum" },  // Assuming CampaignStatus is an enum  
  { label: "Start Date", key: "startDate", dataType: "dateMMDDYYYYHHmm" },  // Assuming formatted date/time
  { label: "End Date", key: "endDate", dataType: "dateMMDDYYYYHHmm" },  // Assuming formatted date/time
  { label: "Created At", key: "createdAt", dataType: "dateMMDDYYYYHHmm" },  // Assuming formatted date/time
  { label: "Updated At", key: "updatedAt", dataType: "dateMMDDYYYYHHmm" },  // Assuming formatted date/time  
  { label: "Advertiser", key: "advertiser", dataType: "action", action: "/advertisers", actionKey: "advertiserId" },
  { label: "Ads", key: "ads", dataType: "action", action: "/ads", actionKey: "id" },
  { label: "Tags", key: "tags", dataType: "action", action: "/tags", actionKey: "id" },
  { label: "Filters", key: "filters", dataType: "action", action: "/filters", actionKey: "id" },
  { label: "Ad Impressions", key: "adImpressions", dataType: "action", action: "/adImpressions", actionKey: "id" },
];

export default function Campaigns() {
    const [campaignData, setAdvertisersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/campaign');
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
        <StatsBar stats={na}  />
        <TableCondensed headers={headers} data={campaignData}  />
        {/* <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0 space-x-3">
        <StatCard item={na}/>
        <StatCard item={na}/>
        <StatCard item={na}/>        
        </dl> */}

    </>
);
  }
