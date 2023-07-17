"use client";

import React, { useState } from 'react';
import Form from './Form';
import Visualizations from './Visualizations';
import {RawDataList} from '../types/raw-data-from-mountain-project';

const Dashboard: React.FC = () => {
  // Set component state (data), and create a function to mutate our state (setData)
  // the 'type' of data will either be RawDataList or Processed Row List. Still have to decide, based on which file we decide to process the data in, 
  // which is why it is any right now
  const [data, setData] = useState<RawDataList | null>(null);
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
