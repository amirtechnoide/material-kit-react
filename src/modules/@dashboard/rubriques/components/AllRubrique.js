import PropTypes from 'prop-types';
// @mui
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Link, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
// import useDeleteTag from '../hooks/useDeleteTag';
import useMessage from '../../../../components/message/useMessage';
import { errorHandler } from '../../../../configs/errorConfigs';

// import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

AllRubrique.propTypes = {
    products: PropTypes.array.isRequired,
};

export default function AllRubrique({ products, ...other }) {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedTagId, setSelectedTagId] = useState(null);
    const [selectedTagValue, setSelectedTagValue] = useState("");
    const messenger = useMessage();

    // const deteleTag = useDeleteTag(selectedTagId)
    const handleEdit = (tagId, value) => {
        // Mettez ici la logique de modification
        setSelectedTagValue(value)
        setDeleteDialogOpen(true);
        console.log(`Modifier le tag avec l'ID : ${tagId}`);
    };

    const handleDelete = (tagId) => {
        setSelectedTagId(tagId);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setSelectedTagId(null);
        setDeleteDialogOpen(false);
    };

    const handleCloseEditDialog = (value) => {
        selectedTagValue(value);
        setDeleteDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        // Mettez ici la logique de suppression
        console.log(`Supprimer le tag avec l'ID : ${selectedTagId}`);
        deteleTag.mutate(selectedTagId, {
            onSuccess: () => {
                messenger.showMessage({
                    message: "Operation éffectuée avec succès",
                    type: "success",
                });
            },
            onError: (error) => {
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
            },
        })
        handleCloseDeleteDialog();
    };
    return (
        <Grid container spacing={3} {...other}>
            {products.map((tag) => (
                <Grid key={tag.rubrique_id} item xs={12} sm={6} md={3}>
                    <Card>
                        <Stack spacing={2} sx={{ p: 2 }}>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Link color="inherit" underline="hover">
                                    <Typography variant="subtitle2" noWrap>
                                        Titre: {tag.rubrique_title}
                                    </Typography>
                                </Link>
                                <Box>
                                    {/* <IconButton onClick={() => handleEdit(tag.rubrique_id)} size='small' aria-label="delete">
                                        <EditIcon fontSize='small' color='inherit' />
                                    </IconButton> */}
                                    {/* <IconButton onClick={() => handleDelete(tag.rubrique_id)} size='small' aria-label="delete">
                                        <ClearIcon fontSize='small' color='error' />
                                    </IconButton> */}
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
                <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Êtes-vous sûr de vouloir supprimer ce tag ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Annuler
                    </Button>
                    <Button variant='contained' onClick={handleConfirmDelete} color="error" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
