import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VillageData() {
  const [villageData, setVillageData] = useState([]);
  const [villageDataLoading, setVillageDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/village/getVillages');
        setVillageData(response.data);
        setVillageDataLoading(false);
      } catch (error) {
        console.error('Error fetching village data:', error);
        setVillageDataLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(villageData)

  if (villageDataLoading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Village Data</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Beneficiary Count</th>
          </tr>
        </thead>
        <tbody>
          {villageData && villageData.map((village) => (
            <tr key={village._id}>
              <td style={styles.td}>{village.name}</td>
              <td style={styles.td}>{village.beneficiaries.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '800px',
    margin: '0 auto'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
    color: '#333'
  },
  td: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    color: '#333'
  },
  loading: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '18px',
    color: '#555'
  }
};

export default VillageData;
