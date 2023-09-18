import PropTypes from 'prop-types';
// @mui
import { Alert, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { isAxiosError } from 'axios';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import useDeleteTag from '../hooks/useDeleteTag';
import useMessage from '../../../../components/message/useMessage';
import { errorHandler } from '../../../../configs/errorConfigs';

// import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

AllTags.propTypes = {
    products: PropTypes.array.isRequired,
};

export default function AllTags({ products, ...other }) {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const messenger = useMessage();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const deteleTag = useDeleteTag(selectedTag?.tag_id)

    const handleDelete = (tag) => {
        setSelectedTag(tag);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setSelectedTag(null)
        setErrorMessage('')
        setLoading(false)
        setDeleteDialogOpen(false)
    };

    const handleConfirmDelete = async () => {
        // Mettez ici la logique de suppression
        // console.log("first")
        setLoading(true)
        deteleTag.mutate(selectedTag?.tag_id, {
            onSuccess: () => {
                messenger.showMessage({
                    message: `Tag #${ selectedTag.name } supprimé avec succès`,
                    type: "success",
                });
                handleCloseDeleteDialog()
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

                setLoading(false)
            },
        })
    };
    return (
        <Grid container spacing={3} {...other}>
            {products.map((tag) => (
                <Grid key={tag.tag_id} item xs={12} sm={6} md={3}>
                    <Card>
                        <Stack spacing={2} sx={{ p: 2 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Link color="inherit" underline="hover">
                                    <Typography variant="subtitle2" noWrap>
                                        # {tag.name}
                                    </Typography>
                                </Link>
                                <Box>
                                    {/* <IconButton onClick={() => handleEdit(tag.tag_id)} size='small' aria-label="delete">
                                        <EditIcon fontSize='small' color='inherit' />
                                    </IconButton> */}
                                    <IconButton onClick={() => handleDelete(tag)} size='small' aria-label="delete">
                                        <ClearIcon fontSize='small' color='error' />
                                    </IconButton>
                                </Box>
                            </Stack>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Stack component="span" fontSize='small' color='gray'>
                                    Created on 6 May 2023
                                </Stack>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            ))}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={() => handleConfirmDelete() }>
                    <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
                    <DialogContent>
                        {errorMessage && <Alert sx={{ mb: 1 }} severity="error">{errorMessage}</Alert>}
                        <DialogContentText id="alert-dialog-description">
                            Êtes-vous sûr de vouloir supprimer le tag <span style={{ fontWeight: 'bold' }}>#{ selectedTag?.name }</span> ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog} color="primary">
                            Annuler
                        </Button>
                        <LoadingButton 
                            variant='contained' 
                            onClick={() => { handleConfirmDelete() }} 
                            color="error" 
                            loading={ loading }
                        >
                            Supprimer
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>

            {/* <Dialog
                open={isEditDialogOpen}
                onClose={handleCloseEditDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Êtes-vous sûr de vouloir supprimer ce tag ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Annuler
                    </Button>
                    <Button variant='contained' onClick={handleConfirmDelete} color="error" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog> */}
        </Grid>
    );
}
