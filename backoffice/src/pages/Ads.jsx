
import StatsBar from "../components/StatsBar";
import TableCondensed from "../components/TableCondensed";
import React, { useState, useEffect } from 'react';

const na = [{name: "Total Subscribers", stat: "71,897"},{name: "Total Subscribers", stat: "71,897"},{name: "Total Subscribers", stat: "71,897"}]
const headers = [
  { label: "ID", key: "id", dataType: "number" },
  { label: "Campaign ID", key: "campaignId", dataType: "number" },
  { label: "Name", key: "name", dataType: "string" },
  { label: "Target Device Type", key: "targetDeviceType", dataType: "enum" },  // Assuming DeviceType is an enum
  { label: "Creative Format", key: "creativeFormat", dataType: "string" },
  { label: "Creative URL", key: "creativeURL", dataType: "url" },
  { label: "Landing URL", key: "landingURL", dataType: "url" },
  { label: "Duration", key: "duration", dataType: "duration" },
  { label: "Status", key: "status", dataType: "enum" },  // Assuming AdStatus is an enum
  { label: "Created At", key: "createdAt", dataType: "dateMMDDYYYYHHmm" },  // Assuming formatted date/time
  { label: "Updated At", key: "updatedAt", dataType: "dateMMDDYYYYHHmm" },  // Assuming formatted date/time
  { label: "Campaign", key: "campaign", dataType: "action", action: "/campaigns/{actionKey}", actionKey: "campaignId" },
  { label: "Schedule Details", key: "scheduleDetails", dataType: "action", action: "/schedule-details/{actionKey}", actionKey: "id" },
  { label: "Ad Impressions", key: "adImpressions", dataType: "action", action: "/adImpressions/{actionKey}", actionKey: "id" },
];

export default function Ads() {
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
