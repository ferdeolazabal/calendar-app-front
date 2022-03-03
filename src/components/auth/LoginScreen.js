import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../redux/actions/auth';
import validator from 'validator';
import Swal from 'sweetalert2'
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        loginEmail: 'ferdeolazabal@gmail.com',
        loginPassword: '123456'
    });
    
    const [ formRegisterValues, handleRegisterInputChange ] = useForm( {
        regName: 'nando',
        regEmail: 'nando@gmail.com',
        regPassword: '123456',
        regPassword2: '123456'
    });

    const { loginEmail, loginPassword } = formLoginValues;
    const { regName, regEmail, regPassword, regPassword2 } = formRegisterValues;


    const handleLogin = (e) => {
        e.preventDefault();
        isFormValid()
        dispatch( startLogin( loginEmail, loginPassword ) );
    }

    const handleRegister = (e) => {
        e.preventDefault();
        // isFormValid()
        if ( regPassword !== regPassword2 ) {
            return Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                icon: 'error',
            })
        }
        dispatch( startRegister( regEmail, regPassword, regName ) );
    }

    const isFormValid = () => {
        if ( !validator.isEmail( loginEmail ) ) {
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'Email no válido'
            })
            return false;
        }
        else if( loginPassword.length < 6 ){
            Swal.fire({
                icon: 'info',
                title: 'Oops...',
                text: 'La Contraseña debe tener al menos 6 caracteres'
            })
            return false;
        }
        // else {
        //     Swal.fire({
        //         icon: 'success',
        //         title: 'Bienvenido',
        //         text: 'Iniciando sesión...'
        //     })
        //     return true;
        // }
    };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                // @ts-ignore
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                // @ts-ignore
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit= { handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='regName'
                                value={ regName }
                                // @ts-ignore
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='regEmail'
                                value={ regEmail }
                                // @ts-ignore
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='regPassword'
                                value={ regPassword }
                                // @ts-ignore
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='regPassword2'
                                value={ regPassword2 }
                                // @ts-ignore
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}