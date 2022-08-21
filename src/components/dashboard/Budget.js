import * as React from 'react';
/* eslint-disable no-unused-vars */
import MoneyIcon from '@mui/icons-material/Money';
import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';

function Budget({ budget, name }) {
 const [budgetVal, setBudgetVal] = React.useState(budget);
 const [cardName, setCardName] = React.useState(name);
 return (
  <Card sx={{ height: '100%' }}>
   <CardContent>
    <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
     <Grid item>
      <Typography color="textSecondary" gutterBottom variant="overline">
       {cardName}
      </Typography>
      <Typography color="textPrimary" variant="h4">
       ${budgetVal}
      </Typography>
     </Grid>
     <Grid item>
      <Avatar
       sx={{
        backgroundColor: 'error.main',
        height: 56,
        width: 56,
       }}
      >
       <MoneyIcon />
      </Avatar>
     </Grid>
    </Grid>
   </CardContent>
  </Card>
 );
}

export default Budget;
