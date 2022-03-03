import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../redux/actions/auth";

export const Navbar = () => {

    const dispatch = useDispatch()
    // @ts-ignore
    const { name } = useSelector( state => state.auth );
    const nameCapitalized = name.charAt(0).toUpperCase() +name.slice(1);

    const handleLogOut = () => {
        dispatch( startLogout() );
    };

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i> { nameCapitalized }
            </span>

            <button 
                className="btn btn-outline-danger"
                onClick={ handleLogOut }
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir </span>
            </button>

        </div>
    )
}
