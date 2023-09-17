import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useQueryClient } from 'react-query';
import { isAxiosError } from 'axios';
import { Alert, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useFormik, ErrorMessage } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useCreateRubrique } from '../hooks/useCreateRubrique';
import { RubriqueValidation } from '../utils/validation';
import useMessage from '../../../../components/message/useMessage';
import { errorHandler } from '../../../../configs/errorConfigs';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function ModalFormRubrique({ open, onClose }) {
    const { mutate, isLoading } = useCreateRubrique()
    const queryClient = useQueryClient()

    const [errorMessage, setErrorMessage] = React.useState('');
    const messenger = useMessage();
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: RubriqueValidation,
        onSubmit: values => {
            const datas = {
                title: values?.title,
            }

            mutate(datas, {
                onSuccess: () => {
                    queryClient.invalidateQueries(["allRubriques"])

                    messenger.showMessage({
                        message: "Operation éffectuée avec succès",
                        type: "success",
                    });
                    onClose();
                },
                onError: (error) => {
                    // isLoading = false
                    if (isAxiosError(error)) {
                        messenger.showMessage({
                            message: `Une erreur s'est produite:  ${error?.response?.data?.message}`,
                            type: "error",
                        });
                    }
                    if (error?.response?.data?.statusCode === 401 || error?.response?.data?.status === 401) {
                        const message = "Une erreur s'est produite"

                        errorHandler(error, message)
                        setErrorMessage(message)

                    } else {
                        errorHandler(error)
                    }
                }
            })
        }
    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit} >
                {/* {errorMessage && <Alert sx={{ mb: 4 }} severity="error">{errorMessage}</Alert>} */}

                <Dialog
                    onClose={onClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    // sx={{ fullWidth: "100%" }}
                    fullWidth
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Creer une Nouvelle Rubrique
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
                        <TextField
                            type="text"
                            sx={{ mt: "1rem" }}
                            size="md"
                            fullWidth
                            name="title"
                            label="Nom de la Rubrique"
                            value={formik.values.title}
                            // error={formik.errors.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                            placeholder='---'
                        />
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton size="large"
                            type="submit" onClick={() => formik.handleSubmit()}
                            loading={isLoading} variant="contained" >
                            Creer
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </form>
        </div >
    );
}