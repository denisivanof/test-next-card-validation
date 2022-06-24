import React from 'react';
import {IMaskInput} from "react-imask";

const TextMaskCustom = React.forwardRef( function TextMaskCustom(props,ref) {
    const { onChange,name,...other} = props;
    const mask = {
        CardNumber: "#000 0000 0000 0000",
        ExpDate: "#0/0000",
        Cvv: "#00",
        Amount: Number
    }
    return (
        <IMaskInput
            {...other}
            mask={mask[name]}
            definitions={{'#': /[0-9]/,}}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

export default TextMaskCustom;
