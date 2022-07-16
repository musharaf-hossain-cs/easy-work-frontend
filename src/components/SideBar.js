import { useNavigate } from 'react-router-dom';
import SidebarData from '../lib/SidebarData';
import styles from '../styles/SideBar.module.css';

export default function SideBar() {
 const navigate = useNavigate();
 return (
  <div className={styles.SideBar}>
   <ul className={styles.SideBarList}>
    {SidebarData.map((val, key) => (
     <li
      key={key}
      className={styles.SideBarRow}
      id={window.location.pathname === val.link ? styles.active : ''}
      onClick={() => navigate(val.link, { replace: false })}
     >
      <div id={styles.icon}>{val.icon}</div>
      <div id={styles.title}>{val.title}</div>
     </li>
    ))}
   </ul>
   ;
  </div>
 );
}
