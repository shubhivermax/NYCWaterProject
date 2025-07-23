import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import '../App.css';
import Graph from './Graph';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const WaterFeild = () => {
  const [waterData, setWaterData] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState(''); // For category filter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://data.cityofnewyork.us/resource/bkwf-xfky.json?$order=sample_time DESC&$limit=100'
        );
        console.log('API data:', response.data);
        const filteredData = response.data.map((item: any) => ({
          sample_time: item.sample_time,
          sample_site: item.sample_site,
          sample_class: item.sample_class,
          residual_free_chlorine_mg_l: item.residual_free_chlorine_mg_l,
          turbidity_ntu: item.turbidity_ntu
        }));
        setWaterData(filteredData);
      } catch (error: any) {
        console.error('Error fetching water data:', error);
      }
    };

    fetchData();
  }, []);

  

  // Get unique sample_site values for the dropdown
  const uniqueSites = Array.from(new Set(waterData.map(item => item.sample_site).filter(Boolean)));

  
  const filteredData = waterData.filter((item: any) => {
    const matchesClass = item.sample_class?.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = category ? item.sample_site === category : true;
    return matchesClass && matchesCategory;
  });

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 1);
  };

  const displayedData = filteredData.slice(0, visibleCount);

  const avgChlorine =
    displayedData.length > 0
      ? (
          displayedData.reduce((sum, item) => {
            const val = parseFloat(item.residual_free_chlorine_mg_l);
            return sum + (isNaN(val) ? 0 : val);
          }, 0) / displayedData.length
        ).toFixed(3)
      : 'N/A';

  const maxChlorine =
    displayedData.length > 0
      ? Math.max(
          ...displayedData.map(item => {
            const val = parseFloat(item.residual_free_chlorine_mg_l);
            return isNaN(val) ? -Infinity : val;
          })
        ).toFixed(3)
      : 'N/A';
    
  const chartData = displayedData.map((item, idx) => ({
    index: idx + 1,
    sample_time: item.sample_time,  // <-- add this!
    residual_free_chlorine_mg_l: parseFloat(item.residual_free_chlorine_mg_l) || 0,
    turbidity_ntu: parseFloat(item.turbidity_ntu) || 0,
  }));
      
      
   console.log('chartData:', chartData);

  

  return (
    <div>
    <h1>The NYC Water Project</h1>
    <div className="main-flex-container">
      
      {/* Left: Stats */}
      <div className='leftpanel'>
      <div className="stats-panel">
        <h3>Stats</h3>
        <div>Total Records Displayed: {displayedData.length}</div>
        <div>Average Chlorine (mg/L): {avgChlorine}</div>
        <div>Highest Chlorine (mg/L): {maxChlorine}</div>
      </div>

      <div className='graph1'>
      <div className="chart-box" style={{ width: '100%', height: 300 }}>
       
        <h3>Chlorine Levels Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sample_time" tickFormatter={(tick) => tick ? tick.slice(11,16) : ''} />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="residual_free_chlorine_mg_l"
              name="Chlorine (mg/L)"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
       
      </div>

      <div className="chart-box" style={{ width: '100%', height: 300 }}>
        <h3>Turbidity Levels Over Time</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sample_time" tickFormatter={(tick) => tick ? tick.slice(11,16) : ''} />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="turbidity_ntu"
              name="Turbidity (NTU)"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
      

      </div>
      {/* Right: Water Fields */}
      <div className="waterfields-panel">
        <h2>Water Sample Info</h2>
        <input
          type="text"
          placeholder="Filter by Class"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        {/* Category filter dropdown */}
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">All Sites</option>
          {uniqueSites.map(site => (
            <option key={site} value={site}>{site}</option>
          ))}
        </select>
        {visibleCount < filteredData.length && (
          <button onClick={handleLoadMore}>Add A Record +</button>
        )}
        <div className="flex-container">
          {filteredData.slice(0, visibleCount).map((item: any, idx: number) => (
          <Link to={`/details/${encodeURIComponent(item.sample_site)}`} key={idx} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='feildbox'>
              <div>Site: {item.sample_site}</div>
              <div>Time: {item.sample_time}</div>
              <div>Class: {item.sample_class}</div>
              <div>Chlorine (mg/L): {item.residual_free_chlorine_mg_l}</div>
              <div>Turbidity (NTU): {item.turbidity_ntu}</div>
              <hr />
            </div>
          </Link>
          
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default WaterFeild;
