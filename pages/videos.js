import React, { useEffect } from 'react';

function videos() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    console.log('fetching data');
    fetch(`/api/videos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      });
  }, []);

  return <div>VIDEOS</div>;
}

export default videos;
