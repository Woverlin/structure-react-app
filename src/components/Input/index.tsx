import { InputProps, Input as InputAnt } from "antd";
import React from "react";

interface InputProp extends InputProps {
    containerClass?: string;
    title?: string;
}

const Input = ({ title, containerClass = "", ...rest }: InputProp) => {
    return (
        <div className={`${containerClass} py-2`}>
            <div>{title}</div>
            <InputAnt {...rest} />
        </div>
    );
};

export default Input;
