import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from 'react-bootstrap/Button';

function ChooseEstimationModel({ setStep }) {
 return (
  <div>
   <h2 className="alignCenter">LOC Estimate</h2>
   <Card sx={{ maxWidth: 345 }} className="d-inline-block m-1">
    <CardActionArea onClick={() => setStep(2)}>
     <CardMedia
      component="img"
      height="300"
      // eslint-disable-next-line global-require
      image={require('../../assets/simple-cost-estimation.png')}
      alt="green iguana"
     />
     <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       Simple Estimation Model
      </Typography>
      <Typography variant="body2" color="text.secondary">
       Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
       all continents except Antarctica
      </Typography>
     </CardContent>
    </CardActionArea>
   </Card>

   <Card sx={{ maxWidth: 345 }} className="d-inline-block m-1">
    <CardActionArea onClick={() => setStep(10)}>
     <CardMedia
      component="img"
      height="300"
      // eslint-disable-next-line global-require
      image={require('../../assets/advanced-cost-estimation.png')}
      alt="green iguana"
     />
     <CardContent>
      <Typography gutterBottom variant="h5" component="div">
       Advanced Estimation Model
      </Typography>
      <Typography variant="body2" color="text.secondary">
       Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
       all continents except Antarctica
      </Typography>
     </CardContent>
    </CardActionArea>
   </Card>
   <br />
   <Button onClick={() => setStep(0)}> Back</Button>
  </div>
 );
}

export default ChooseEstimationModel;
