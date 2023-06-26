"use client";

import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [climbingData, setClimbingData] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedFile) {
      // We can process data from the file in here and then pass it into setClimbingData
      alert("You've Successfully uploaded a file. We aren't yet able to process it, unfortunately.")
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {
        /*
          some logic that checks if climbingData is populated, and if so, outputs the <Visualizations data={climbingData} /> component
        */
      }
    </div>

  );
};

export default Dashboard;
