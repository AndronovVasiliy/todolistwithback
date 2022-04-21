import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

const PreviewToDoList = () => {
    return (
        <>
            <div className='toDoList'>
                {
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
                <Button disabled variant="primary"><span className="material-icons">
                    add
                </span></Button>{' '}
                <Button disabled variant="primary"><span className="material-icons">
                    delete
                </span></Button>{' '}
            </div>
        </>
    )
}

export default PreviewToDoList