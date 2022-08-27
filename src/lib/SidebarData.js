import Spaces from '@mui/icons-material/AccountTree';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlagIcon from '@mui/icons-material/Flag';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const SidebarData = [
 {
  title: 'Dashboard',
  link: '/dashboard',
  icon: <DashboardIcon />,
 },
 {
  title: 'Create Space',
  link: '/new-space',
  icon: <AddBoxIcon />,
 },
 {
  title: 'View Spaces',
  link: '/spaces',
  icon: <Spaces />,
 },
 {
  title: 'Manage Space',
  link: '/manage-space',
  icon: <ManageHistoryIcon />,
 },
 {
  title: 'Milestones',
  link: '/milestones/1',
  icon: <FlagIcon />,
 },
 {
  title: 'Estimate Cost',
  link: '/estimate-cost',
  icon: <MonetizationOnIcon />,
 },
];

export default SidebarData;
