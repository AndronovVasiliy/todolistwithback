import moment from 'moment'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import {  updateStatusTask } from '../../reducers/reduserToDoList'
import { RootState } from '../../store/store'
import { ListTaskType } from './ToDoList'
import './Task.css'
import { useState } from 'react'
import AddTaskForm from '../form/AddTaskForm'

type PropsType = {
    deleteTask: (e: string) => void,
    toDoListId: string,
    getTask: () => void,
    closeForm: () => void
}

type MyThunkDispatch = ThunkDispatch<RootState, undefined, any>

const Task = (props: ListTaskType & PropsType) => {

    const dispatch = useDispatch<MyThunkDispatch>()
    const[upDateTask, setUpdateTask] = useState(false)

    const isCompleted = () => {
        let status = props.status
               
        if(status === 0){
            status = 1
        } else status = 0     
        
        const obJsend = {
            title: props.title,
            description: props.description,
            completed: props.completed,
            status: status,
            priority: 1,
            startDate: moment().format(),
            deadline: moment().format(),
        }

        dispatch(updateStatusTask(props.toDoListId, props.id, obJsend)).then(() => {
            props.getTask()
        })
    }    

    return (
        <>
        {upDateTask && <AddTaskForm toDoListId={props.todoListId} description = {props.description} title = {props.title} idTask= {props.id}  getTask={() => props.getTask()} closeForm={() => setUpdateTask(false)}/>}
        <Card>
            <Card.Header>{props.title}</Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.description}
                </Card.Text>
            </Card.Body>
            <ButtonGroup size="sm" aria-label="Basic example">
                {props.status === 0 ?
                    <Button onClick={() => isCompleted()} variant="primary">Завершить</Button>:
                    <Button onClick={() => isCompleted()} variant="flat">Возабновить</Button>
                }
                
                <Button onClick={() => setUpdateTask(true)} variant="primary">Изменить</Button>
                <Button onClick={() => props.deleteTask(props.id)} variant="primary">Удалить</Button>
            </ButtonGroup>
        </Card>
        </>
    )
}

export default Task