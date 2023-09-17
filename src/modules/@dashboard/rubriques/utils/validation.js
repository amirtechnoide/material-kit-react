import * as Yup from 'yup'

const RubriqueValidation = Yup.object().shape({
    title: Yup.string().min(2, "Minimum 2 caractères").required('Enter a category name'),
})


export { RubriqueValidation }
