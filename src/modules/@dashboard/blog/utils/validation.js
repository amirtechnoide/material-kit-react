import { toast } from 'react-toastify'
import * as Yup from 'yup'

const blogValidation = Yup.object().shape({
    title: Yup.string().required('Entrez un titre'),
    type: Yup.string().required('Sélectionnez un type'),
    rubrique: Yup.object().required('Sélectionnez une rubrique'),
    tag: Yup.object().required('Sélectionnez un tag'),
    link: Yup.string().required("Entrez l'URL du média"),
    // description: Yup.string().required("Entrez une description de l'article"),
    cover_image: Yup.string().when('type', (type, schema) => {
        return type[0] === 'video' ? schema.required("Entrez une URL de couverture") : schema;
    }),
    description: Yup.string().when('type', (type, schema) => {
        return type[0] !== 'video' ? schema.required("Entrez une description de l'article") : schema;
    }),
    location: Yup.string().when('type', (type, schema) => {
        return type[0] === 'evenements' ? schema.required('Entrez une location') : schema;
    }),
    date: Yup.date().when('type', (type, schema) => {
        return type[0] === 'evenements' ? schema.required('Sélectionnez une date') : schema;
    }),
    time: Yup.string().when('type', (type, schema) => {
        return type[0] === 'evenements' ? schema.required('Entrez l\'heure') : schema;
    }),
});


const youtubeVideoRegex = /(?:\?v=|&v=|\/embed\/|\.be\/)([\w\d_-]+)/

const checkUpladedFile = (file) => {
    const extension = file?.type?.split('/')[0]
    let validFile = true

    if (extension !== 'image') {
        validFile = false
        toast.error('Veuillez choisir un fichier image !', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        })
    }

    if (Math.round(file.size / 100) / 10 > 3120) {
        validFile = false
        toast.error('Votre fichier ne doit pas peser plus de 3 Mo !', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000
        });
    }

    return validFile
}

export { youtubeVideoRegex, blogValidation, checkUpladedFile }
