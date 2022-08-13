/* eslint-disable no-inner-declarations */
/* eslint-disable no-loop-func */
/* eslint-disable no-plusplus */
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
        const predecessorId = e.values.predecessorId
        const successorId = e.values.successorId
        let dependencyId = null
        console.log(typeof(predecessorId))
        console.log(successorId)
        for(let i = 0; i < dependencies.length; i++) {
            console.log("Inside for loop")
            console.log(typeof(dependencies[i].predecessorId))
            console.log(dependencies[i].successorId)
            if(Number(dependencies[i].predecessorId) === Number(predecessorId) && Number(dependencies[i].successorId === Number(successorId))) {
                dependencyId = dependencies[i].dependencyId
                console.log("Dhuksi")
                // eslint-disable-next-line no-shadow
                setDependencies(dependencies.filter((dependency) => dependency.dependencyId !== dependencyId))
                break
            }
        }
        async function sendData() {
            const res = await fetchBackendJSON(`taskmgmt/deleteDependency/${dependencyId}`, 'GET');
            console.log(res);
        }
        sendData();
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
        else{
            const data = {
                parent_task: predecessorId,
                dependent_on_task: successorId
            }
            async function sendData() {
                const res = await fetchBackendJSON('taskmgmt/addDependency', 'POST', data);
                console.log(res);
            }
            sendData();
        }
    }
    const onTaskDeleted=(e) => {
        if(e.key === 'Enter') e.preventDefault()
        console.log("Task deleted!")
        console.log(e.values.id)
        const taskId = Number(e.values.id)
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].id === taskId){
                // eslint-disable-next-line no-shadow
                setTasks(tasks.filter((task) => task.id !== taskId))
                break
            }
        }
        async function sendData() {
            const res = await fetchBackendJSON(`project/deleteTask/${taskId}`, 'GET');
            console.log(res);
        }
        sendData();
        console.log(tasks)
    }
    const onTaskInserted=(e) => {
        if(e.key === 'Enter') e.preventDefault()
        console.log("Task inserted!")
        console.log(e.values)
        let startDate =  JSON.stringify(e.values.start)
        let endDate =  JSON.stringify(e.values.end)
        startDate = startDate.split('T')[0]
        endDate = endDate.split('T')[0]
        startDate = startDate.substring(1)
        endDate = endDate.substring(1)
        console.log(startDate)
        console.log(endDate)
        const data = {
            project_id: 4,
            title: 'New Task',
            start_time: startDate,
            end_time: endDate,
            status: 'Not Started',
            slack_time: 0,
        };
        async function sendData() {
            const res = await fetchBackendJSON('project/addtask', 'POST', data);
            console.log(res);
         
            if (e.values.parentId) {
                const res2 = await fetchBackendJSON('project/addtaskparent', 'POST', {
                parent_task_id: Number(e.values.parentId),
                sub_task_id: res.id,
                });
                console.log(res2);
            }
        }
        sendData();
    }
    const onTaskUpdated=(e) => {
        if(e.key === 'Enter') e.preventDefault()
        console.log("Task updated!")
        const taskId = e.key
        console.log(taskId)
        if(e.values.end){
            let needChange = false
            let min = -Number.MAX_VALUE
            let updatedPredecessorEndDate = null
            let predecessorEndDate = JSON.stringify(e.values.end)
            predecessorEndDate = predecessorEndDate.split('T')[0]
            predecessorEndDate += "\""
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
                    const dayDiff = (successorStartDate - predecessorEndDate) / (1000 * 3600 * 24)
                    if(dayDiff < 0){
                        needChange = true
                        if(dayDiff > min){
                            min = dayDiff
                            updatedPredecessorEndDate = task.start
                        }
                    }
                }
            });
            if(needChange){
                alert("Predecessor Task cannot end after the start of Successor Task!!")
                setTasks((oldTasks) => {
                    const newTasks = JSON.parse(JSON.stringify(oldTasks))
                    newTasks.forEach((task) => {
                        if(task.id === taskId){
                            predecessorEndDate = Date.parse(task.end)
                            const predecessorStartDate = Date.parse(task.start)
                            const dayDiff = Math.abs(predecessorEndDate - predecessorStartDate) / (1000 * 3600 * 24)
                            console.log(dayDiff)
                            // eslint-disable-next-line no-param-reassign
                            task.end = updatedPredecessorEndDate
                            console.log(task.start)
                            let updatedPredecessorStartDate = new Date(task.start)
                            updatedPredecessorStartDate.setDate(updatedPredecessorStartDate.getDate() - dayDiff)
                            updatedPredecessorStartDate = JSON.stringify(updatedPredecessorStartDate)
                            updatedPredecessorStartDate = updatedPredecessorStartDate.split('T')[0]
                            updatedPredecessorStartDate = updatedPredecessorStartDate.substring(1)
                            // eslint-disable-next-line no-param-reassign
                            task.start = updatedPredecessorStartDate
                            console.log(task.start)
                        }
                    });
                    return newTasks;
                });
            }
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
                setTasks((oldTasks) => {
                    const newTasks = JSON.parse(JSON.stringify(oldTasks))
                    newTasks.forEach((task) => {
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
                    return newTasks;
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
            console.log(dependency)
            setDependencies([
                ...dependencies,
                {
                    dependencyId: dependency.dependency_id,
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
