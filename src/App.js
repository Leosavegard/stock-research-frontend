import React, { useState, useEffect } from 'react';

function App() {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/companies/belowIntrinsicValue");
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000); // Poll every 60 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div className="App">
      {company ? (
        <>
          <h1>{company.name}</h1>
          <p>PE: {company.pe}</p>
          <p>EPS: {company.eps}</p>
        </>
      ) : (
        <p>No companies found below intrinsic value.</p>
      )}
    </div>
  );
}

export default App;
