import * as Yup from 'yup'

const loginValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Enter email address'),
    password: Yup.string().required('Enter password').min(8, 'Password should be at least 8 length')
})


export { loginValidation }
