import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createToDOList } from "../../reducers/reduserToDoList";

type Inputs = {
  title: string
};

const AddTuskForm = (props: {close: () => void}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(createToDOList(data.title))
  }

  return (
    <form className="addTaskForm" onSubmit={handleSubmit(onSubmit)}>
      <label>Введите название листа</label>
      <input {...register("title")} />
      {errors.title && <span>This field is required</span>}
      <input value='Сохранить' type="submit" />
      <input onClick={() => props.close()} value='Отмена' type="button" />
    </form>
  );
}

export default AddTuskForm