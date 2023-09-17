import * as Yup from 'yup'

const TagValidation = Yup.object().shape({
    name: Yup.string().min(2, "Minimum 2 caractères").required('Enter Tag name'),
})


export { TagValidation }
