"use client";

import React, { useState } from 'react';
import Form from './Form';
import Visualizations from './Visualizations';

const Dashboard: React.FC = () => {
  // Set component state (data), and create a function to mutate our state (setData)
  const [data, setData] = useState<any | null>(null);

  return (
    <div>
      {
        /* 
          The line below conditionally renders two components. If theres no data, we show the Form component and pass it the setData state mutator. 
          If they have filled out the form, then data will not be populated, in which case we pass data to our visualization component and show the user that.
        */
      }
      {!data ? <Form populateData={setData} /> : <Visualizations data={data} />}
    </div>

  );
};

export default Dashboard;
