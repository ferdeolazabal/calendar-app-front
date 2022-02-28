import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../redux/actions/auth';
import validator from 'validator';
import Swal from 'sweetalert2'
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm( {
        loginEmail: 'ferdeolazabal@gmail.com',
        loginPassword: '123456'
    });

    const { loginEmail, loginPassword } = formLoginValues;

    const handleLogin = (e) => {
        e.preventDefault();
        isFormValid()
        console.log('login', formLoginValues);
        dispatch( startLogin( loginEmail, loginPassword ) );
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
        else {
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: 'Iniciando sesión...'
            })
            return true;
        }
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
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
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