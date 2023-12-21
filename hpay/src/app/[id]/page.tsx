// pages.tsx
'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const GraphApp = () => {
  const [data, setData] = useState(null);
  const userName = usePathname().substring(1);

  const github = async () => {
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