import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import PreviewToDoList from './PreviewToDoList'
import ToDoList from './ToDoList'

const ListToDoList = () => {

    const previewtoDoLists = useSelector((state: RootState) => state.toDoLists.previewtoDoLists)
    const toDoLists = useSelector((state: RootState) => state.toDoLists.toDoLists)
    const login = useSelector((state: RootState) => state.auth.login)

    return (
        <>
            {!login ?
                <>
                    {previewtoDoLists.map((i, index) => <PreviewToDoList key = {index}/>)}
                </> :
                <>
                    {toDoLists.map((i) => {
                        return <ToDoList key={i.id} {...i} />
                    })}
                </>}

        </>
    )
}

export default ListToDoList