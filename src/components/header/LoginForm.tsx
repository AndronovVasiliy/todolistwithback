import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/reduserAuthMe';
import { LoginType } from '../../types/types';
import './loginForm.css'

type IFormInput = {
    mail: string;
    password: string;
    age: number;
    example: string;
}

const LoginForm = (props: {close: ()=> void}) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IFormInput>();

    const dispatch = useDispatch()

    const onSubmit = (data: IFormInput) => {
        const newObj: LoginType = {
            email: data.mail,
            password: data.password,
            captcha: null,
            rememberMe: false
        }        
        dispatch(login(newObj))
    };

    return (
        <form className='loginForm' onSubmit={handleSubmit(onSubmit)}>
            <label>Login</label>
            <input
                {...register("mail", {
                    required: true,
                    maxLength: 20,
                })}
            />
            {errors?.mail?.type === "required" && <p>This field is required</p>}
            {errors?.mail?.type === "maxLength" && (
                <p>First name cannot exceed 20 characters</p>
            )}
            {errors?.mail?.type === "pattern" && (
                <p>Alphabetical characters only</p>
            )}
            <label>Password</label>
            <input type={'password'} {...register("password")} />
            {errors?.password?.type === "pattern" && (
                <p>Alphabetical characters only</p>
            )}
            <input type="submit" value= "Войти"/>
            <input onClick={() => props.close()} type="button" value= "Отмена"/>
        </form>
    );
}

export default LoginForm