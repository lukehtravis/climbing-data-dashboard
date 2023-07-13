"use client";

import React, { useState } from "react";
import Papa, { ParseResult } from "papaparse";
import RawDataRow, { RawDataList } from "../types/raw-data-from-mountain-project";
import { mappingMpCodesToYdsGrades, eliminateSlashesFromGrades, flattenPlusAndMinusGrades, removeRiskRating } from "@/app/utils/data-processing-helpers";
import { YDS_DICT } from "@/app/constants";

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

  const roped = ["Sport", "Trad"];
  const boulder = ["Boulder"]; //  nope let's do this w/o combinations too; looks like some of the boulder/trads were done as trad...filter again
  const boulderStyleNaive = ["Flash", "Send", "Attempt"];
  const ropedStyleNaive = ["Onsight", "Flash", "Redpoint", "Fell/Hung", "Pinkpoint"];

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
            const ropedOnlyNaive = resultsData.filter((oneRoute) => roped.includes(oneRoute["Route Type"]));
            ropedOnlyNaive.forEach(element => {
              element.Rating = eliminateSlashesFromGrades(element.Rating);
              element.Rating = flattenPlusAndMinusGrades(element.Rating);
              element.Rating = removeRiskRating(element.Rating);
              element["Converted Grade"] = YDS_DICT[element.Rating]
              // soundas: this seems a bit kludgy; TODO: how do I chain + assign concisely
            });
            const boulderOnlyNaive = resultsData.filter((oneRoute) => boulder.includes(oneRoute["Route Type"]) || boulderStyleNaive.includes(oneRoute["Style"]));
            let allRoutes = [...ropedOnlyNaive, ...boulderOnlyNaive];
            populateData(allRoutes)
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