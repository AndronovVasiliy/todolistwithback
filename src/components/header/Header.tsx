import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthData, logOut } from '../../reducers/reduserAuthMe'
import { RootState } from '../../store/store'
import './Header.css'
import LoginForm from './LoginForm'

const Header = () => {


  const login = useSelector((state: RootState) => state.auth.login)

  const dispatch = useDispatch()
  const [showLoginForm, setshowLoginFoem] = useState(false)

  useEffect(() => {
    if (login) {
      setshowLoginFoem(false  )
      dispatch(getAuthData())
    }
  }, [login, dispatch])


  const onClicklogOut = () => {
    dispatch(logOut())
  }

  const onClick = () => {
    setshowLoginFoem(true)
  }

  const onClose = () => setshowLoginFoem(false)

  return (
    <div className='headerContainer'>
      {login ?
        <>
          <span>{login}</span><Button onClick={() => onClicklogOut()} variant="primary" size="sm">Sign out</Button>
        </> :
        <>
          <span>Войдите</span><Button onClick={() => onClick()} variant="primary" size="sm">Login</Button>
        </>}
      {showLoginForm && <LoginForm close={() => onClose()} />}
    </div>
  )
}

export default Header