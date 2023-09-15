"use client";

import React from "react";
import { Card, Grid, Box, CardContent, CardHeader } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import OnsightPercentage from "./charts/OnsightPercentage";
import MaxGradeChart from "./charts/MaxGrade";
import { RawDataList } from "../types/raw-data-from-mountain-project";
import Table from "./charts/Table"

// We can define what this object will look like after we decide exactly what we want to pass in
interface Props {
  data: RawDataList
}

// IDK Luke, help
function CustomCard() {
  return (
    <CustomCard>
      styled(Card)`color: #20b2aa;`
      {/* <div className='inner-wrapper'> ... </div> */}
    </CustomCard>
  )
}

// const customCard = styled(Card)`
//   color: #20b2aa;
// `;
// // needs react-native
// const Wrapper = styled.section`
//   padding: 4em;
//   background: papayawhip;
// `;

const Visualizations: React.FC<Props> = ({ data }: Props) => {
  let sportClimbs: RawDataList = []
  let boulders: RawDataList = []
  let tradClimbs: RawDataList = []
  let topRope: RawDataList = []
  data ? data.forEach(row => {
    switch (row["Route Type"]) {
    case "Sport": 
      sportClimbs.push(row)
      break;
    case "Boulder":
      boulders.push(row)
      break;
    case "Trad":
      tradClimbs.push(row)
      break;
    case "Top-Rope":
      topRope.push(row)
      break;
    }
  }) : null
  console.log(data)
  // In this file, we take in some of the processed data, and pass it into a series of vis charts we can create independently and import in here
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <Box>
      <Table data={data} sport={sportClimbs} boulders={boulders} tradClimbs={tradClimbs} topRope={topRope} />
      <Grid container spacing={5}>
        <Grid item>
          <Card title="Onsight Chart" raised> {/*  https://github.com/mui/material-ui/issues/27846 */}
            <CardHeader disableTypography
              title="Sport Climbs: Onsight Percentage"
            />
            <CardContent>
              <OnsightPercentage data={data}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card title="Max Grade Chart" raised>
            <CardHeader disableTypography
              title="Max Grade Over Time"
              // subheader="Woot!" - maybe use titleTypographyProps
            />
            <CardContent>
              <MaxGradeChart data={data} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Visualizations;