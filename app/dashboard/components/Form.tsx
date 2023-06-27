"use client";

import React, { useState } from "react";

interface Props {
  populateData: React.Dispatch<React.SetStateAction<any | null>>
}

const Form: React.FC<Props> = ({populateData}: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      // Do Some Processing to the file here
      // const processedFile = processFile(selectedFile)
      populateData(/*commented out placeholder for processedFile*/"Hi it's me! I'm your data!")
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
  
export default Form;