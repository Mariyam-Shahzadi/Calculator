import "./Display.css";
function Display({ expression, value }) {
    return (
        <div className="calculator-display">
            <div className="display-expression">
                {expression}
            </div>

            <div className="display-value">
                {value}
            </div>
        </div>
    );
}

export default Display;
