import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function DetailPage() {
  const { site } = useParams();
  const [siteData, setSiteData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await axios.get(
          'https://data.cityofnewyork.us/resource/bkwf-xfky.json?$order=sample_time DESC&$limit=100'
        );
        
        const matchedSite = response.data.find(
          (item: any) => item.sample_site === site
        );
        setSiteData(matchedSite || null);
      } catch (error) {
        console.error('Error fetching site data:', error);
        setSiteData(null);
      } finally {
        setLoading(false);
      }
    };

    if (site) fetchSiteData();
  }, [site]);

  if (loading) return <div>Loading site data...</div>;
  if (!siteData) return <div>No data found for site: {site}</div>;

  return (
    <div className="detail-container">
      <h1 className="detail-heading">Site Details</h1>

      <div className="site-box">
        <p className="site-text">Site ID: {siteData.sample_site}</p>
        <p className="site-text">Fluoride (mg/L): {siteData.fluoride_mg_l || 'N/A'}</p>
        {/* You can add more fields here if you want */}
      </div>
    </div>
  );
}

export default DetailPage;

