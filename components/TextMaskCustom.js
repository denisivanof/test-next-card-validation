import React, {useEffect} from 'react';
import {IMaskInput} from "react-imask";

const TextMaskCustom = React.forwardRef( function TextMaskCustom(props,ref) {
    const { onChange,name,...other} = props;
    useEffect(()=>{

    })
    const mask = {
        CardNumber: "#000-0000-0000-0000",
        ExpirationDate: "#00/0000"
    }

    return (
        <IMaskInput
            {...other}
            mask={mask[name]}
            definitions={{
                '#': /[1-9]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

export default TextMaskCustom;
