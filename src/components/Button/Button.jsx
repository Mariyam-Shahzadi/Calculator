import "./Button.css";
function Button({ label, onClick, variant = "number" }) {
    return (
        <button
            className={`calculator-button ${variant}`}
            onClick={onClick}
            type="button"
        >
            {label}
        </button>
    );
}

export default Button;