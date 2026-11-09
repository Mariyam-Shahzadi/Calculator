
import { useState } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import "./Calculator.css";
function Calculator() {
    const [currentValue, setCurrentValue] = useState("0");
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [expression, setExpression] = useState("");
    const [shouldReset, setShouldReset] = useState(false);

    const handleNumber = (number) => {
        if (shouldReset) {
            setCurrentValue(number);
            setShouldReset(false);
            return;
        }

        setCurrentValue((prev) =>
            prev === "0" ? number : prev + number
        );
    };

    const handleOperator = (op) => {
        setPreviousValue(Number(currentValue));
        setOperator(op);
        setExpression(`${currentValue} ${op}`);
        setShouldReset(true);
    };

    const calculate = () => {
        if (previousValue === null || !operator) return;

        const current = Number(currentValue);
        let result = 0;

        switch (operator) {
            case "+":
                result = previousValue + current;
                break;
            case "-":
                result = previousValue - current;
                break;
            case "×":
                result = previousValue * current;
                break;
            case "÷":
                result = current === 0
                    ? "Error"
                    : previousValue / current;
                break;
            default:
                return;
        }

        setExpression(
            `${previousValue} ${operator} ${current} =`
        );
        setCurrentValue(String(result));
        setPreviousValue(null);
        setOperator(null);
        setShouldReset(true);
    };

    const handleDecimal = () => {
        if (shouldReset) {
            setCurrentValue("0.");
            setShouldReset(false);
            return;
        }

        if (!currentValue.includes(".")) {
            setCurrentValue(currentValue + ".");
        }
    };

    const handleDelete = () => {
        if (shouldReset) return;

        setCurrentValue((prev) =>
            prev.length > 1 ? prev.slice(0, -1) : "0"
        );
    };

    const handleClear = () => {
        setCurrentValue("0");
        setPreviousValue(null);
        setOperator(null);
        setExpression("");
        setShouldReset(false);
    };

    const buttons = [
        { label: "AC", variant: "action", action: handleClear },
        { label: "DEL", variant: "action", action: handleDelete },
        { label: "÷", variant: "operator", action: () => handleOperator("÷") },
        { label: "×", variant: "operator", action: () => handleOperator("×") },

        ...["7", "8", "9"].map((n) => ({
            label: n,
            action: () => handleNumber(n),
        })),
        { label: "-", variant: "operator", action: () => handleOperator("-") },

        ...["4", "5", "6"].map((n) => ({
            label: n,
            action: () => handleNumber(n),
        })),
        { label: "+", variant: "operator", action: () => handleOperator("+") },

        ...["1", "2", "3"].map((n) => ({
            label: n,
            action: () => handleNumber(n),
        })),
        { label: "=", variant: "equal", action: calculate },

        { label: "0", action: () => handleNumber("0") },
        { label: ".", action: handleDecimal },
    ];

    return (
        <div className="calculator">
            <div className="calculator-header">
                <h2>Calculator</h2>
            </div>

            <Display
                expression={expression}
                value={currentValue}
            />

            <div className="calculator-buttons">
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        label={button.label}
                        variant={button.variant || "number"}
                        onClick={button.action}
                    />
                ))}
            </div>
        </div>
    );
}

export default Calculator;
