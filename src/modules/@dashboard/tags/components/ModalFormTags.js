import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useQueryClient } from 'react-query';
import { isAxiosError } from 'axios';
import { Alert, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useCreateTags } from '../hooks/useCreateTags';
import { TagValidation } from '../utils/validation';
import useMessage from '../../../../components/message/useMessage';
import { errorHandler } from '../../../../configs/errorConfigs';

export default function ModalFormTags({ open, onClose }) {
    const { mutate } = useCreateTags()
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const messenger = useMessage();
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: TagValidation,
        onSubmit: values => {
            setLoading(true)

            const datas = {
                name: values?.name,
            }

            mutate(datas, {
                onSuccess: () => {
                    queryClient.invalidateQueries(["allTags"])

                    messenger.showMessage({
                        message: `Tag #${ datas.name } crée avec succès`,
                        type: "success",
                    });
                    setLoading(false)
                    onClose();
                    formik.resetForm()
                },
                onError: (error) => {
                    // isLoading = false
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
                    setLoading(false)
                }
            })
        }
    })


    return (
        <div>
            <Dialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth
            >
                <form onSubmit={ formik.handleSubmit }>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Creer un nouveau Tag
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        {errorMessage && <Alert sx={{ mb: 1 }} severity="error">{errorMessage}</Alert>}
                        <TextField
                            type="text"
                            sx={{ mt: "1rem" }}
                            size="md"
                            fullWidth
                            name="name"
                            label="Nom du Tag"
                            value={formik.values.name}
                            // error={formik.errors.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            placeholder='#'
                        />
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton 
                            size="large"
                            type="submit" onClick={() => formik.handleSubmit()}
                            loading={ loading } variant="contained"
                        >
                            Creer
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
        </div >
    );
}