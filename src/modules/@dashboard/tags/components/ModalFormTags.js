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
import { useCreateTags } from '../hooks/useCreateTags';
import { TagValidation } from '../utils/validation';
import useMessage from '../../../../components/message/useMessage';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function ModalFormTags({ open, onClose }) {
    const { mutate, isLoading } = useCreateTags()
    const queryClient = useQueryClient()

    const [errorMessage, setErrorMessage] = React.useState('');
    const messenger = useMessage();
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: TagValidation,
        onSubmit: values => {
            console.log(values)
            const datas = {
                name: values?.name,
            }

            mutate(datas, {
                onSuccess: () => {
                    queryClient.invalidateQueries(["allTags"])

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
                            message: "Une erreur s'est produite:" + error.response.data.message,
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
                    fullWidth={true}
                >
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
                        <LoadingButton size="large"
                            type="submit" onClick={() => formik.handleSubmit()}
                            loading={isLoading ?? errLoading} variant="contained" >
                            Creer
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </form>
        </div >
    );
}