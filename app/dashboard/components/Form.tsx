"use client";

import React, { useState } from "react";
import Papa, { ParseResult } from "papaparse";
import RawDataRow, {RawDataList} from "../types/raw-data-from-mountain-project";

interface Props {
  populateData: React.Dispatch<React.SetStateAction<RawDataList | null>>
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
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results:ParseResult<any>) => {
          if( results.errors.length === 0) {
            const resultsData:RawDataList = results.data 
            // Could just process the data here, or we could use populateData to add it to the state of the Dashboard component and process the data there
            populateData(resultsData)
          }
        }
      })
    }
  };
  
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  
  );
};
  
export default Form;