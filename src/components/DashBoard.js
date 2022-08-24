import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import BarChart from './BarChart';
import Budget from './dashboard/Budget';
import PIECHART from './dashboard/PIECHART';
import CollapsibleTable from './dashboard/TaskTable';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
 display: 'flex',
 flex: '1 1 auto',
 maxWidth: '100%',
 paddingTop: 5,
 [theme.breakpoints.up('lg')]: {
  paddingLeft: 0,
 },
}));

export default function DashBoard() {
 return (
  <DashboardLayoutRoot className="row scrollable2">
   <Box
    className="col-4"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={1200} name="Total Budget" />
   </Box>
   <Box
    className="col-4"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={800} name="Allocated Budget" />
   </Box>
   <Box
    className="col-4"
    sx={{
     display: 'flex',
     flex: '1 1 auto',
     flexDirection: 'column',
    }}
   >
    <Budget budget={400} name="Expected More Expense" />
   </Box>
   <BarChart />
   <PIECHART />
   <hr />
   <CollapsibleTable className="col-12" />
  </DashboardLayoutRoot>
 );
}
