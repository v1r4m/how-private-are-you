// pages.tsx
'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GraphApp = () => {
  const [data, setData] = useState(null);

  const github = async () => {
    const userName = 'v1r4m';
    try {
      const response = await axios.get('/api/github', {params: {userName}});
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    github();
  }, []);

  return (
    <div>
      <h1>Graph App</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default GraphApp;