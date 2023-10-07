import { useParams } from 'react-router-dom';
import * as React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import YouTube from 'react-youtube';
import { isAxiosError } from 'axios';
import { Alert, Autocomplete, Box, Container, Grid, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { blogValidation, checkUpladedFile, youtubeVideoRegex } from '../modules/@dashboard/blog/utils/validation';
import useMessage from '../components/message/useMessage';
import { errorHandler } from '../configs/errorConfigs';

import useAllRubriques from '../modules/@dashboard/rubriques/hooks/useAllRubriques';
import TextWysiwyg from '../components/TextWysiwyg';
import { useUploadImage } from '../modules/@dashboard/blog/hooks/useUploadImage';
import useAllTags from '../modules/@dashboard/tags/hooks/useAllTags';
import useOneArticle from '../modules/@dashboard/blog/hooks/useOneArticle';
import { useEditArticle } from '../modules/@dashboard/blog/hooks/useEditArticle';

export default function EditArticlePage() {
    const { id } = useParams()
    const { mutate, isLoading } = useEditArticle()
    const { mutate: mutateFile, data: urlDataImage, isLoading: uploading } = useUploadImage()
    const [imageNotFound, setImageNotFound] = useState(false);
    const { data: tags } = useAllTags()
    const { data: rubriques } = useAllRubriques()
    const [errorMessage, setErrorMessage] = useState('');
    const messenger = useMessage();
    const { data: article, isLoading: isLoadingArticle, refetch } = useOneArticle(id)

    const dataTags = tags?.data?.map(tag => ({
        id: tag?.tag_id,
        label: tag?.name,
        value: tag?.name
    }))

    const dataRubrique = rubriques?.data?.map((rubrique) => ({
        id: rubrique?.rubrique_id,
        label: rubrique?.rubrique_title,
        value: rubrique?.rubrique_title
    }))

    const formik = useFormik({
        initialValues: {
            title: '',
            type: '',
            rubrique: null,
            link: '',
            tag: null,
            description: '',
            cover_image: '',
            location: '',
            date: '',
            time: '',
        },
        validationSchema: blogValidation,
        onSubmit: values => {
            const datas = {
                title: values?.title,
                description: values?.description,
                rubrique_id: values?.rubrique?.id,
                tag_id: values?.tag?.id,
                media_type: values?.type,
                media_url: values?.link ?? urlDataImage?.data?.image,
                cover_image: values?.cover_image ?? urlDataImage?.data?.image,
                event: {
                    location: values?.location,
                    date: values?.date,
                    time: values?.time
                }
            }

            mutate({id, datas}, {
                onSuccess: () => {
                    messenger.showMessage({
                        message: `Article modifié avec succès`,
                        type: "success",
                    });
                    setTimeout(() => {
                        window.location.href='/dashboard/articles'
                    }, 2000);
                    setErrorMessage('')
                },
                onError: (error) => {
                    if (isAxiosError(error)) {
                        const message = `Une erreur s'est produite: ${error.response.data.message}`
            
                        messenger.showMessage({
                            message,
                            type: "error",
                        });
                        setErrorMessage(message)
                    }
                    if (error?.response?.data?.statusCode === 401 || error?.response?.data?.status === 401) {
                        const message = "Une erreur s'est produite"
            
                        errorHandler(error, message)
                        setErrorMessage(message)
            
                    } else {
                        errorHandler(error)
                    }
                },
            })
        }
    })

    useEffect(() => {
        if(article && dataRubrique && dataTags){
            const articleValue = article?.article

            formik.setFieldValue('title', articleValue?.title)
            formik.setFieldValue('type', articleValue?.media?.media_type)
            formik.setFieldValue('rubrique', dataRubrique.find(rubrique => rubrique?.id === articleValue?.rubrique?.rubrique_id))
            formik.setFieldValue('link', articleValue?.media?.media_url)
            formik.setFieldValue('tag', dataTags.find(tag => tag?.id === articleValue?.tag?.tag_id))
            formik.setFieldValue('description', articleValue?.description)
            formik.setFieldValue('cover_image', articleValue?.cover_image)
            formik.setFieldValue('location', articleValue?.event_details?.location)
            formik.setFieldValue('date', articleValue?.event_details?.date)
            formik.setFieldValue('time', articleValue?.event_details?.time)
        }
    }, [tags, rubriques, isLoadingArticle, id])

    useEffect(() => {
        refetch()
    }, [])

    const onFileChange = (e) => {
        if (e.target.files) {
            const file = e.target.files[0]

            const formData = new FormData()
            formData.append('image', file)

            if (checkUpladedFile(file)) {
                mutateFile(formData)
            }
        }
    }

    const onRubriqueChange = (e, option) => {
        if(option.value === 'Replays') formik.setFieldValue('type', 'video')
        else if(option.value === 'Evenements') formik.setFieldValue('type', 'evenements')
        else formik.setFieldValue('type', 'image')

        formik.setFieldValue('rubrique', option)
    }

    useEffect(() => {
        if(formik.values.type === 'video') formik.setFieldValue('cover_image', urlDataImage?.data?.image)
        else formik.setFieldValue('link', urlDataImage?.data?.image)
    },[ uploading ])
    
    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Modifier un article
                </Typography>
            </Stack>
            { rubriques && tags && article && !isLoadingArticle && id ?
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
                        sx={{ background: '#fff' }}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Grid container columnSpacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    options={dataRubrique}
                                    value={formik?.values?.rubrique?.value}
                                    error={formik.touched.rubrique && formik.errors.rubrique}
                                    helperText={formik.touched.rubrique && formik.errors.rubrique}
                                    onChange={ onRubriqueChange }
                                    onBlur={formik.handleBlur}
                                    renderInput={(params) => <TextField value={ formik.values?.rubrique?.value } {...params} label="Rubrique" />}
                                    sx={{ background: '#fff' }}
                                />
                                {formik.touched.rubrique && formik.errors.rubrique && <Box sx={{ color: 'red', mb: 1, fontSize: '0.7rem' }}>{formik.errors.rubrique}</Box>}
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                                    sx={{ background: '#fff' }}
                                />
                                {formik.touched.tag && formik.errors.tag && <Box sx={{ color: 'red', mb: 1, fontSize: '0.7rem' }}>{formik.errors.tag}</Box>}
                            </Grid>
                        </Grid>
                    </Box>
                    { formik.values.rubrique?.value === 'Evenements' &&
                        <Box mt={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        onChange={formik.handleChange}
                                        value={formik.values.location ?? ''}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.location && formik.errors.location}
                                        helperText={formik.touched.location && formik.errors.location}
                                        required
                                        type='text'
                                        label='Location'
                                        name='location'
                                        fullWidth
                                        id="location"
                                        placeholder='Location'
                                        variant="outlined"
                                        sx={{ background: '#fff' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        onChange={formik.handleChange}
                                        value={formik.values.date ?? ''}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.date && formik.errors.date}
                                        helperText={formik.touched.date && formik.errors.date}
                                        required
                                        type='date'
                                        name='date'
                                        fullWidth
                                        id="date"
                                        placeholder='Date'
                                        variant="outlined"
                                        sx={{ background: '#fff' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        onChange={formik.handleChange}
                                        value={formik.values.time ?? ''}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.time && formik.errors.time}
                                        helperText={formik.touched.time && formik.errors.time}
                                        required
                                        type='time'
                                        name='time'
                                        fullWidth
                                        id="time"
                                        placeholder='Time'
                                        variant="outlined"
                                        sx={{ background: '#fff' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    }
                    {formik.values.type &&
                        <Box sx={{ mt: 2 }}>
                            <Grid container columnSpacing={2}>
                                {formik.values.type !== 'video' &&
                                    <Grid item xs={12} sm={4}>
                                        <LoadingButton loading={uploading} sx={{ py: 2 }} fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                            Uploader image
                                            <input type='file' onChange={onFileChange} style={{ display: 'none' }} />
                                        </LoadingButton>
                                    </Grid>
                                }
                                <Grid item xs={12} sm={formik.values.type !== 'video' ? 8 : 12}>
                                    <TextField
                                        onChange={(e) => { setImageNotFound(false); formik.setFieldValue('link', e.target.value) }}
                                        value={formik.values.link ?? urlDataImage?.data?.image ?? ''}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.link && formik.errors.link !== undefined}
                                        helperText={formik.touched.link && formik.errors.link}
                                        required
                                        type='text'
                                        label='Media URL'
                                        fullWidth
                                        id="link"
                                        placeholder={ formik.values.type === 'video' ? 'https://www.youtube.com/watch?v=xxxxxxxxxxx' : 'Image link' }
                                        variant="outlined"
                                        sx={{ background: '#fff' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    }
                    
                    {formik.values.link && formik.values.type === 'video' &&
                        ((formik.values.link).match(youtubeVideoRegex) ?
                            <YouTube
                                style={{ marginTop: 5 }}
                                opts={{ height: '200', width: '100%' }}
                                videoId={(formik.values.link).match(youtubeVideoRegex)}
                            />
                            :
                            <Box sx={{ background: '#ffa1a1', color: '#fff', borderRadius: 1, my: 1, p: 1 }}>
                                This URL is not valid !
                            </Box>
                        )
                    }
                    {formik.values.type === 'video' &&
                        <Box sx={{ mt: 2 }}>
                            <Grid container columnSpacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <LoadingButton loading={uploading} sx={{ py: 2 }} fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                        Upload cover image
                                        <input type='file' onChange={onFileChange} style={{ display: 'none' }} />
                                    </LoadingButton>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        onChange={(e) => { setImageNotFound(false); formik.setFieldValue('cover_image', e.target.value) }}
                                        value={formik.values.cover_image ?? urlDataImage?.data?.image ?? ''}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.cover_image && formik.errors.link !== undefined}
                                        helperText={formik.touched.cover_image && formik.errors.cover_image}
                                        required
                                        type='text'
                                        label='Cover image'
                                        fullWidth
                                        id="cover_image"
                                        placeholder={ 'Cover image link' }
                                        variant="outlined"
                                        sx={{ background: '#fff' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    }
                    {
                        ((formik.values.type !== 'video' && formik.values.link) || 
                        (formik.values.type === 'video' && formik.values.cover_image))  &&
                        <Grid container spacing={1} sx={{ background: imageNotFound ? '#ffa1a1' : '#D5F6E3', borderRadius: 1, my: 1, p: 1 }}>
                            <Grid item md={6} xs={12} sx={{ display: 'flex' }}>
                                <img alt='Article Img' id='previewImage' onError={() => setImageNotFound(true)} src={ imageNotFound ? '/noImage.png' : formik.values.type === 'video' ? formik.values.cover_image : formik.values.link } style={{ width: 60, height: 50, background: '#ffffff', objectFit: 'cover' }} />
                                <Box sx={{ ml: 2 }}>{imageNotFound ? "This image doesn't exist" : "Selected Media"}</Box>
                            </Grid>
                        </Grid>
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
                            Modifier
                        </LoadingButton>
                    </Box>
                </Box>
            </form>
            :
                <Skeleton variant="rounded" width={'100%'} height={400} />
            }
        </Container>
    );
}