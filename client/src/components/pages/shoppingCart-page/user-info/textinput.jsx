import { useField } from 'formik';

const TextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className='user__error'>{meta.error}</div>
            ) : null}
        </>
    )
};

export default TextInput;
