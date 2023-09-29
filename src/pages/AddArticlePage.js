import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { isAxiosError } from 'axios';
import YouTube from 'react-youtube';
import { Alert, Autocomplete, Box, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { blogValidation, checkUpladedFile, youtubeVideoRegex } from '../modules/@dashboard/blog/utils/validation';
import useMessage from '../components/message/useMessage';
import { errorHandler } from '../configs/errorConfigs';

import useAllRubriques from '../modules/@dashboard/rubriques/hooks/useAllRubriques';
import TextWysiwyg from '../components/TextWysiwyg';
import { useUploadImage } from '../modules/@dashboard/blog/hooks/useUploadImage';
import useAllTags from '../modules/@dashboard/tags/hooks/useAllTags';
import { useCreatePost } from '../modules/@dashboard/blog/hooks/useCreatePost';

export default function AddArticlePage() {
    const { mutate, isLoading } = useCreatePost()
    const { mutate: mutateFile, data: urlDataImage, isLoading: uploading } = useUploadImage()
    const [imageNotFound, setImageNotFound] = useState(false);
    const { data: tags } = useAllTags()
    const { data: rubriques } = useAllRubriques()
    const [errorMessage, setErrorMessage] = useState('');
    const messenger = useMessage();
    const dataTags = tags?.data?.map(tag =>
    ({
        id: tag?.tag_id,
        label: tag?.name,
        value: tag?.name
    })
    )
    console.log(dataTags);

    const dataRubrique = rubriques?.data?.map((rubrique) =>
    ({
        id: rubrique?.rubrique_id,
        label: rubrique?.rubrique_title,
        value: rubrique?.rubrique_title
    })
    )

    const formik = useFormik({
        initialValues: {
            title: '',
            type: '',
            rubrique: null,
            link: '',
            tag: null,
            description: ''
        },
        validationSchema: blogValidation,
        onSubmit: values => {
            console.log('values', values)
            const datas = {
                title: values?.title,
                description: values?.description,
                rubrique_id: values?.rubrique?.id,
                tag_id: values?.tag?.id,
                media_type: values?.type,
                media_url: values?.link,
                cover_image: values?.link
            }

            mutate(datas, {
                onSuccess: () => {
                    messenger.showMessage({
                        message: `Article publié avec succès`,
                        type: "success",
                    });
                    setErrorMessage('')
                    formik.resetForm()
                },
                onError: (error) => {
                    if (isAxiosError(error)) {
                        const message = `Une erreur s'est produite: ${error.response.data.message}`

                        messenger.showMessage({
                            message,
                            type: "error",
                        });
                        setErrorMessage(message)
                    } else {
                        setErrorMessage(errorHandler(error))
                    }
                }
            })
        }
    })

    const onFileChange = (e) => {
        if (e.target.files) {
            const file = e.target.files[0]

            const formData = new FormData()
            formData.append('image', file)

            if (checkUpladedFile(file)) {
                mutateFile(formData, {
                    onSuccess: () => {
                        setImageNotFound(false)
                        formik.setFieldValue('link', urlDataImage?.data?.image)
                    },
                })
            }
        }
    }

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Ajouter un article
                </Typography>
            </Stack>

            <form onSubmit={ formik.handleSubmit }>
                <Box>
                    {errorMessage && <Alert sx={{ mb: 1 }} severity="error">{errorMessage}</Alert>}
                    <TextField
                        type="text"
                        size="md"
                        fullWidth
                        name="title"
                        label="Titre"
                        value={formik.values.title}
                        error={formik.touched.title && formik.errors.title}
                        helperText={formik.touched.title && formik.errors.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    <Box sx={{ mt: 2 }}>
                        <Grid container columnSpacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={dataRubrique}
                                    value={formik?.values?.rubrique?.value}
                                    error={formik.touched.rubrique && formik.errors.rubrique}
                                    helperText={formik.touched.rubrique && formik.errors.rubrique}
                                    onChange={(e, option) => formik.setFieldValue('rubrique', option)}
                                    onBlur={formik.handleBlur}
                                    renderInput={(params) => <TextField {...params} label="Rubrique" />}
                                />
                                {formik.touched.rubrique && formik.errors.rubrique && <Box sx={{ color: 'red', mb: 1, fontSize: '0.7rem' }}>{formik.errors.rubrique}</Box>}
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={dataTags}
                                    value={formik?.values?.tag?.value}
                                    error={formik.errors.tag}
                                    onChange={(e, option) => formik.setFieldValue('tag', option)}
                                    onBlur={formik.handleBlur}
                                    renderInput={(params) => <TextField {...params} label="Tags" />}
                                />
                                {formik.touched.tag && formik.errors.tag && <Box sx={{ color: 'red', mb: 1, fontSize: '0.7rem' }}>{formik.errors.tag}</Box>}
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="type"
                                    options={['image', 'video']}
                                    value={formik.values.type}
                                    error={formik.errors.type}
                                    onChange={(e, option) => formik.setFieldValue('type', option)}
                                    onBlur={formik.handleBlur}
                                    renderInput={(params) => <TextField {...params} label="Type" />}
                                />
                                {formik.touched.type && formik.errors.type && <Box sx={{ color: 'red', mb: 1, fontSize: '0.7rem' }}>{formik.errors.type}</Box>}
                            </Grid>
                        </Grid>
                    </Box>
                    {formik.values.type &&
                        <Box sx={{ mt: 2 }}>
                            <Grid container columnSpacing={2}>
                                {formik.values.type === 'image' &&
                                    <Grid item xs={12} sm={4}>
                                        <LoadingButton loading={uploading} sx={{ py: 2 }} fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Uploader image
                                            <input type='file' onChange={onFileChange} style={{ display: 'none' }} />
                                        </LoadingButton>
                                    </Grid>
                                }
                                <Grid item xs={12} sm={formik.values.type === 'image' ? 8 : 12}>
                                    <TextField
                                        onChange={(e) => { setImageNotFound(false); formik.setFieldValue('link', e.target.value) }}
                                        value={formik.values.link ?? ''}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.link && formik.errors.link !== undefined}
                                        helperText={formik.touched.link && formik.errors.link}
                                        required
                                        type='text'
                                        label='Media URL'
                                        fullWidth
                                        id="link"
                                        placeholder='https://www.youtube.com/watch?v=xxxxxxxxxxx'
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    }
                    {formik.values.type && !formik.errors.link && formik.values.link &&
                        (formik.values.type === 'video' ?
                            (formik.values.link).match(youtubeVideoRegex) ?
                                <YouTube
                                    style={{ marginTop: 5 }}
                                    opts={{ height: '200', width: '100%' }}
                                    videoId={(formik.values.link).match(youtubeVideoRegex)}
                                />
                                :
                                <Box sx={{ background: '#ffa1a1', color: '#fff', borderRadius: 1, my: 1, p: 1 }}>
                                    This URL is not valid !
                                </Box>
                            :
                            <Grid container spacing={1} sx={{ background: imageNotFound ? '#ffa1a1' : '#D5F6E3', borderRadius: 1, my: 1, p: 1 }}>
                                <Grid item md={6} xs={12} sx={{ display: 'flex' }}>
                                    <img alt='Article Img' id='previewImage' onError={() => setImageNotFound(true)} src={ imageNotFound ? '/noImage.png' : formik.values.link } style={{ width: 60, height: 50, background: '#ffffff', objectFit: 'cover' }} />
                                    <Box sx={{ ml: 2 }}>{imageNotFound ? "This image doesn't exist" : "Selected Media"}</Box>
                                </Grid>
                            </Grid>
                        )

                    }
                    <Box sx={{ mt: 2 }}>
                        <TextWysiwyg
                            value={formik.values.description}
                            setValue={(value) => formik.setFieldValue('description', value)}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            height={200}
                        />
                        {formik.touched.description && formik.errors.description && <Box sx={{ color: 'red', mb: 1, fontSize: '0.7rem' }}>{formik.errors.description}</Box>}
                    </Box>
                    <Box sx={{ mt: 8 }}>
                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit" onClick={() => formik.handleSubmit()}
                            loading={isLoading} variant="contained"
                        >
                            Créer
                        </LoadingButton>
                    </Box>
                </Box>
            </form>
        </Container>
    );
}