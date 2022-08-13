/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
import 'devextreme/dist/css/dx.light.css';
import React, { useEffect, useState } from 'react';

import Gantt, {
    Column,
    Dependencies,
    Editing,
    Item, Tasks,
    Toolbar,
    Validation
} from 'devextreme-react/gantt';

import fetchBackendJSON from '../actions/Fetch';

export default function GanttChart() {
    const [tasks, setTasks] = useState([]);
    const [dependencies, setDependencies] = useState([]);
    const onDependencyDeleting=(e) => {
        if(e.key === 'Enter') e.preventDefault()
        console.log("Dependency deleted!")
        console.log(e.values.predecessorId)
        console.log(dependencies)
    }
    const onDependencyInserted=(e) => {
        if(e.key === 'Enter') e.preventDefault()
        const predecessorId = Number(e.values.predecessorId)
        const successorId = Number(e.values.successorId)
        let predecessorEndDate = null
        let successorStartDate = null
        tasks.forEach((task) => {
            if(task.id === predecessorId){
                predecessorEndDate = task.end
            }
            if(task.id === successorId){
                successorStartDate = task.start
            }    
        });
        predecessorEndDate = Date.parse(predecessorEndDate)
        successorStartDate = Date.parse(successorStartDate)
        let isValid = true
        if(predecessorEndDate > successorStartDate) {
            alert("Error!!\nSomething is wrong with the dates!")
            isValid = false
        }
        dependencies.forEach((dependency) => {
            if(dependency.predecessorId === predecessorId && dependency.successorId === successorId){
                console.log("Hello There!!")
            }
        });
        if(!isValid){
            // eslint-disable-next-line no-shadow
            setDependencies(dependencies.filter((dependency) => dependency.predecessorId !== predecessorId || dependency.successorId !== successorId))
        }
    }
    const onTaskDeleted=(e) => {
        if(e.key === 'Enter') e.preventDefault()
        console.log("Task deleted!")
        console.log(e.values.id)
        console.log(tasks)
    }
    const onTaskInserted=(e) => {
        if(e.key === 'Enter') e.preventDefault()
        console.log("Task inserted!")
        let startDate =  JSON.stringify(e.values.start)
        let endDate =  JSON.stringify(e.values.end)
        startDate = startDate.split('T')[0]
        endDate = endDate.split('T')[0]
        startDate += "\""
        endDate += "\""
        console.log(startDate)
        console.log(endDate)
    }
    const onTaskUpdated=(e) => {
        if(e.key === 'Enter') e.preventDefault()
        console.log("Task updated!")
        const taskId = e.key
        console.log(taskId)
        if(e.values.end){
            let predecessorEndDate =  JSON.stringify(e.values.end)
            predecessorEndDate = predecessorEndDate.split('T')[0]
            predecessorEndDate += "\""
            const dateToInsert = predecessorEndDate
            predecessorEndDate = Date.parse(predecessorEndDate)
            const successors = []
            dependencies.forEach((dependency) => {
                if(dependency.predecessorId === taskId){
                    successors.push(dependency.successorId)
                }
            });
            tasks.forEach((task) => {
                if(successors.includes(task.id)){
                    const successorStartDate = Date.parse(task.start)
                    const successorEndDate = Date.parse(task.end)
                    const dayDiff = Math.abs(successorStartDate - successorEndDate) / (1000 * 3600 * 24)
                    console.log(dayDiff)
                    if(predecessorEndDate > successorStartDate){
                        alert("Successor Task is automatically updated to start at the end of the predecessor task!")
                        // eslint-disable-next-line no-param-reassign
                        task.start = dateToInsert
                        console.log(task.start)
                        let newSuccessorEndDate = new Date(task.start)
                        newSuccessorEndDate.setDate(newSuccessorEndDate.getDate() + dayDiff)
                        newSuccessorEndDate = JSON.stringify(newSuccessorEndDate)
                        newSuccessorEndDate = newSuccessorEndDate.split('T')[0]
                        newSuccessorEndDate += "\""
                        // eslint-disable-next-line no-param-reassign
                        task.end = newSuccessorEndDate
                        console.log(task.end)
                    }
                }    
            });
            console.log(tasks)
        }
        if(e.values.start){
            let needChange = false
            let min = -Number.MAX_VALUE
            let updatedSuccessorStartDate = null
            let successorStartDate =  JSON.stringify(e.values.start)
            successorStartDate = successorStartDate.split('T')[0]
            successorStartDate += "\""
            // const dateToInsert = successorStartDate
            successorStartDate = Date.parse(successorStartDate)
            const predecessors = []
            dependencies.forEach((dependency) => {
                if(dependency.successorId === taskId){
                    predecessors.push(dependency.predecessorId)
                }
            });
            tasks.forEach((task) => {
                if(predecessors.includes(task.id)){
                    // Compare task.end with successorStartDate
                    const predecessorEndDate = Date.parse(task.end)
                    const dayDiff = (successorStartDate - predecessorEndDate) / (1000 * 3600 * 24)
                    if(dayDiff < 0){
                        needChange = true
                        if(dayDiff > min){
                            min = dayDiff
                            updatedSuccessorStartDate = task.end
                        }
                    }
                }    
            });
            if(needChange){
                alert("Successor Task cannot start before the end of Predecessor Task!!")
                tasks.forEach((task) => {
                    if(task.id === taskId){
                        console.log("Kire mama")
                        successorStartDate = Date.parse(task.start)
                        const successorEndDate = Date.parse(task.end)
                        const dayDiff = Math.abs(successorStartDate - successorEndDate) / (1000 * 3600 * 24)
                        console.log(dayDiff)
                        // eslint-disable-next-line no-param-reassign
                        task.start = updatedSuccessorStartDate
                        console.log(task.start)
                        let updatedSuccessorEndDate = new Date(task.start)
                        updatedSuccessorEndDate.setDate(updatedSuccessorEndDate.getDate() + dayDiff)
                        updatedSuccessorEndDate = JSON.stringify(updatedSuccessorEndDate)
                        updatedSuccessorEndDate = updatedSuccessorEndDate.split('T')[0]
                        updatedSuccessorEndDate = updatedSuccessorEndDate.substring(1)
                        // eslint-disable-next-line no-param-reassign
                        task.end = updatedSuccessorEndDate
                        console.log(task.end)
                    }
                });
            }
            console.log(tasks)
        }
    }
    useEffect(() => {
        // eslint-disable-next-line prettier/prettier
        let fetchedData;
        async function fetchData() {
         fetchedData = await fetchBackendJSON('taskmgmt/getproject_tasks', 'POST', { project_id: 4 });
         console.log('In space');
         console.log(fetchedData);
         let temp = [];
         fetchedData.task_list.forEach((task) => {
            temp.push({
                id: task.id,
                parentId: task.parent_id,
                title: task.title,
                start: task.start,
                end: task.end,
                progress: 0,
            });
         });
         setTasks(temp);
         temp = [];
         fetchedData.dependency_list.forEach((dependency) => {
            setDependencies([
                ...dependencies,
                {
                    predecessorId: dependency.predecessor_id,
                    successorId: dependency.successor_id,
                    type: 0,
                }

            ]);
         });
        }
        fetchData();
       }, []);
 return (
  <Gantt taskListWidth={500} scaleType="weeks" height={850} width={1550} 
    onDependencyDeleting={onDependencyDeleting}
    onDependencyInserted={onDependencyInserted}
    onTaskDeleted={onTaskDeleted}
    onTaskInserted={onTaskInserted}
    onTaskUpdated={onTaskUpdated}
  >
   <Tasks dataSource={tasks} />
   <Dependencies dataSource={dependencies} />
   {/* <Resources dataSource={resources} />
   <ResourceAssignments dataSource={resourceAssignments} /> */}

   <Toolbar>
    <Item name="undo" />
    <Item name="redo" />
    <Item name="separator" />
    <Item name="collapseAll" />
    <Item name="expandAll" />
    <Item name="separator" />
    <Item name="addTask" />
    <Item name="deleteTask" />
    <Item name="separator" />
    <Item name="zoomIn" />
    <Item name="zoomOut" />
   </Toolbar>

   <Column dataField="title" caption="Subject" width={300} />
   <Column dataField="start" caption="Start Date" />
   <Column dataField="end" caption="End Date" />

   <Validation autoUpdateParentTasks />
   <Editing enabled />
  </Gantt>
 );
}
