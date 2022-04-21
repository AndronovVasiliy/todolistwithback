import moment from "moment";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { createTask, updateStatusTask } from "../../reducers/reduserToDoList";
import { RootState } from "../../store/store";
import './AddTaskForm.css';

type Inputs = {
    title: string,
    description: string
};

type PropsType = {
    closeForm: () => void,
    toDoListId: string,
    getTask: () => void,
    idTask?: string,
    title?: string,
    description?: string
}

type MyThunkDispatch = ThunkDispatch<RootState, undefined, any>

export default function AddTaskForm(props: PropsType) {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const dispatch = useDispatch<MyThunkDispatch>()
    const onSubmit: SubmitHandler<Inputs> = data => {

        const obJsend = {
            title: data.title,
            description: data.description,
            completed: false,
            status: 0,
            priority: 1,
            startDate: moment().format(),
            deadline: moment().format(),
        }
        if (!props.idTask) {
            dispatch(createTask(obJsend, props.toDoListId)).then(() => {
                props.closeForm()
                props.getTask()
            })
        }
        if (props.idTask) {
            dispatch(updateStatusTask(props.toDoListId, props.idTask, obJsend)).then(() => {
                props.closeForm()
                props.getTask()
            })
        }
    }

    return (
        <div className="addTaskForm">
            <form onSubmit={handleSubmit(onSubmit)}>
                {props.title ?  <label>{`Изменить задачу ${props.title}`}</label> : <label>Название задачи</label>}
                {/* <label>Название задачи</label> */}
                <input defaultValue={props.title ? props.title : ''} {...register("title")} />

                {/* include validation with required or other standard HTML validation rules */}
                <label>Описание задачи</label>
                <input defaultValue={props.description ? props.description : ''} {...register("description", { required: true })} />
                {/* errors will return when field validation fails  */}

                <input type="submit" value={"Добавить"} />
                <input onClick={() => props.closeForm()} type="button" value={"Отмена"} />
            </form>
        </div>
    );
};