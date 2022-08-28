import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchBackendJSON from '../../actions/Fetch';
import ChooseProject from '../spaces/ChooseProject';

function ProjectChoiceForMilestone() {
 const [projects, setProjects] = useState([]);
 const navigate = useNavigate();

 const newProjectChosen = (projectId) => {
  navigate(`/milestones/${projectId}`, { replace: false });
 };

 useEffect(() => {
  // eslint-disable-next-line prettier/prettier
  let fetchedData;
  async function fetchData() {
   fetchedData = await fetchBackendJSON('taskmgmt/getprojects', 'POST', {});
   console.log('In Project Choice For Milestone: ', fetchedData);
   setProjects(fetchedData.project_list);
  }
  fetchData();
 }, []);

 return (
  <div>
   {projects.length > 0 && <ChooseProject projects={projects} afterChoice={newProjectChosen} />}
  </div>
 );
}

export default ProjectChoiceForMilestone;
