import React, {InputHTMLAttributes} from 'react';
import {FormControl, FormErrorMessage, FormLabel} from "@chakra-ui/form-control";
import {Input} from "@chakra-ui/input";
import {useField} from "formik";
import {Badge} from "@chakra-ui/layout";

type InputFieldInterface = InputHTMLAttributes<HTMLInputElement> & {
    type:string;
    label:string;
    placeholder:string;
    name:string;
    add_label?:string;
    isDisabled?:boolean;
    warning?:string;
};

const InputField:React.FC<InputFieldInterface> = (props) => {
    const [field,{error}] = useField(props);
    return (
        <>
            <FormControl pt={5} isInvalid={!!error}>
                <FormLabel htmlFor={field.name}>{props.label}<Badge colorScheme={"linkedin"} mx={2}>{props.add_label}</Badge></FormLabel>
                <Input isDisabled={props.isDisabled} width={{ base: '220px', md: '550px' }} {...field} id={field.name} bg={"white"} type={props.type} placeholder={props.placeholder} />
                <FormErrorMessage>{error||props.warning}</FormErrorMessage>
            </FormControl>
        </>
    );
};

export default InputField;