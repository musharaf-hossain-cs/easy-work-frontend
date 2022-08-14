import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Budget from './dashboard/Budget';
import CollapsibleTable from './dashboard/TaskTable';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
 display: 'flex',
 flex: '1 1 auto',
 maxWidth: '100%',
 paddingTop: 64,
 [theme.breakpoints.up('lg')]: {
  paddingLeft: 0,
 },
}));

export default function DashBoard() {
 return (
  <DashboardLayoutRoot className="row scrollable2">
   <Box
    className="col-6"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={12} />
   </Box>
   <Box
    className="col-6"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={12} />
   </Box>
   <hr />
   <CollapsibleTable className="col-12" />
  </DashboardLayoutRoot>
 );
}
