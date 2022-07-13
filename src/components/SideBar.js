import SidebarData from '../lib/SidebarData';
import styles from '../styles/SideBar.module.css';

export default function SideBar() {
 return (
  <div className={styles.SideBar}>
   <ul className={styles.SideBarList}>
    {SidebarData.map((val, key) => (
     // eslint-disable-next-line react/no-array-index-key
     <li key={key} className={styles.SideBarRow}>
      <div id={styles.icon}>{val.icon}</div>
      <div id={styles.title}>{val.title}</div>
     </li>
    ))}
   </ul>
   ;
  </div>
 );
}
