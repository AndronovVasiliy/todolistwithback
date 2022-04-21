import React, { useState } from 'react'
import { Button, Collapse, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { toDoListsApi } from '../../api/toDoListsApi';
import { deleteTodoList } from '../../reducers/reduserToDoList';
import { ToDolistsType } from '../../types/types';
import AddTaskForm from '../form/AddTaskForm';
import Task from './Task';
import './ToDoList.css'

export type ListTaskType = {
    addedDate: string,
    deadline: string,
    description: string,
    id: string,
    order: number,
    priority: number,
    startDate: string,
    status: number,
    title: string,
    todoListId: string,
    completed: boolean
}

const ToDoList = (props: ToDolistsType) => {

    const dispatch = useDispatch()

    const [addTask, setaddTask] = useState(false);
    const [open, setOpen] = useState(false);
    const [listTasks, setlistTasks] = useState<Array<ListTaskType>>([])
    const [progress, setProgress] = useState(false)
    const [downloads, setdownloads] = useState(false)

    const onClick = () => {
        setaddTask(!addTask)
    }

    const deleteTask = (e: string) => {
        toDoListsApi.deleteTask(props.id, e).then(res => {
            const arr = listTasks.filter(i => i.id !== e)
            setlistTasks(arr)
        })
    }

    const getTask = () => {
        return toDoListsApi.getTasks(props.id)
            .then(res => setlistTasks(res.data.items))
    }

    const openList = () => {
        if (!downloads) {
            if (!progress) {
                setProgress(true)
                getTask().then(() => {
                    setOpen(!open)
                    setProgress(false)
                    setdownloads(true)
                })
            }
        }
        setOpen(!open)
    }

    const onDelete = () => {
        dispatch(deleteTodoList(props.id))
    }

    return (
        <>
            {<div className='toDoList'>
                {addTask && <AddTaskForm getTask={() => getTask()} toDoListId={props.id} closeForm={() => setaddTask(!addTask)} />}
                {!progress ? <Button
                    onClick={() => openList()}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    {props.title}
                </Button> :
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Loading...
                    </Button>}
                <Button onClick={() => onClick()} variant="primary"><span className="material-icons">
                    add
                </span></Button>{' '}
                <Button onClick={() => onDelete()} variant="primary"><span className="material-icons">
                    delete
                </span></Button>{' '}
                <Collapse in={open && downloads}>
                    {<div id="example-collapse-text">
                        {listTasks.length > 0 ?
                            listTasks.map(i => <Task closeForm={() => onClick()} getTask={() => getTask()} deleteTask={deleteTask} toDoListId={props.id} key={i.id} {...i} />) :
                            <div>Лист пуст</div>}
                    </div>}
                </Collapse>
            </div>}
        </>

    )
}

export default ToDoList