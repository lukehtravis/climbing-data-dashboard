"use client";

import React, { useState } from "react";
import Papa, { ParseResult } from "papaparse";
import RawDataRow, { RawDataList } from "../types/raw-data-from-mountain-project";
import { mappingMpCodesToYdsGrades, eliminateSlashesFromGrades, flattenPlusAndMinusGrades, removeRiskRating } from "@/app/utils/data-processing-helpers";

interface Props {
  populateData: React.Dispatch<React.SetStateAction<RawDataList | null>>
}

const Form: React.FC<Props> = ({ populateData }: Props) => {
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
        complete: (results: ParseResult<any>) => {
          if (results.errors.length === 0) {
            const resultsData: RawDataList = results.data
            // process here, Luke said
            resultsData.forEach(element => {
              element.Rating = eliminateSlashesFromGrades(element.Rating);
              element.Rating = flattenPlusAndMinusGrades(element.Rating);
              element.Rating = removeRiskRating(element.Rating);
              // soundas: this seems a bit kludgy; TODO: how do I chain + assign concisely
            });
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