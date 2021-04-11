import { Field } from 'formik';
import React from 'react';

function Textarea(props) {
    const {label, name, ...rest} = props;
    return (
        <>
            <label  htmlFor={name}>{label}</label>
            <Field  as='textarea' id={name} name={name} {...rest} />
        </>
    );
}

export default Textarea;