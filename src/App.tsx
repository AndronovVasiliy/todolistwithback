import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/header/Header';
import { getToDoLists } from './reducers/reduserToDoList';
import AddTuskForm from './components/form/AddToDoForm';
import ListToDoList from './components/taskList/ListToDoList';
import { Button } from 'react-bootstrap';
import { RootState } from './store/store';
import { getAuthData } from './reducers/reduserAuthMe';

function App() {

  const [addList, setaddList] = useState(false)
  const toDoLists = useSelector((state: RootState) => state.toDoLists.toDoLists)
  const login = useSelector((state: RootState) => state.auth.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuthData())
  })

  useEffect(() => {
    if (login) {
      dispatch(getToDoLists())
    }
  }, [login, dispatch])

  useEffect(() => {
    setaddList(false)
  }, [toDoLists, dispatch])

  return (
    <div className='app'>
      <Header />
      {addList ?
        <>
          <AddTuskForm close={() => setaddList(false)} />
          <Button disabled={!login} onClick={() => setaddList(true)} variant="primary" size="lg">Добавить лист</Button>
        </> :
        <>
          <Button disabled={!login} onClick={() => setaddList(true)} variant="primary" size="lg">Добавить лист</Button>
        </>}
      <div><h2>Листы задач</h2></div>
      <ListToDoList />
    </div>
  );
}

export default App;
