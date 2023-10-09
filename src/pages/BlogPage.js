import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { isAxiosError } from 'axios';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Button, Container, Stack, Typography, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination } from '@mui/material';
import useAllArticles from '../modules/@dashboard/blog/hooks/useAllArticles';
// components
import Iconify from '../components/iconify';
import { BlogPostCard } from '../modules/@dashboard/blog/components/index';
// mock
import SkeletonBlog from '../modules/@dashboard/blog/components/SkeletonBlog';
import useDeleteArticle from '../modules/@dashboard/blog/hooks/useDeleteArticle';
import { errorHandler } from '../configs/errorConfigs';
import useMessage from '../components/message/useMessage';
// ----------------------------------------------------------------------

export default function BlogPage() {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const messenger = useMessage();
  const { mutate, isLoading:isLoadingDelete } = useDeleteArticle(selectedArticle?.id)

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { isLoading, data } = useAllArticles(page, rowsPerPage)

  const handleDelete = (article) => {
    setSelectedArticle(article);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedArticle(null)
    setErrorMessage('')
    setDeleteDialogOpen(false)
  }; 
  
  const handleConfirmDelete = async () => {
    mutate(selectedArticle?.id, {
      onSuccess: () => {
        messenger.showMessage({
          message: `Article ${ selectedArticle.title } supprimé avec succès`,
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
      },
    })
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Liste des articles
          </Typography>
          <Link to='/dashboard/articles/addArticle'>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Nouvel Article
            </Button>
          </Link>
        </Stack>

        <Grid container spacing={3}>
          {
            isLoading ?
              <SkeletonBlog />
              :
              data?.items?.length > 0 ?
                <>{
                data?.items?.map((post) => (
                  post?.media?.media_type !== 'video' &&
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      handleDelete={handleDelete}
                    />
                ))}
                </>
                :
                <Alert severity="error">Aucun article trouvé !</Alert>
          }
        </Grid>
        
        {data?.items?.length > 0 &&     
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.items?.filter(post => post?.media?.media_type !== 'video').length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
      </Container>

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
                    Êtes-vous sûr de vouloir supprimer l'article <span style={{ fontWeight: 'bold' }}>"{ selectedArticle?.title }"</span> ?
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
                    loading={ isLoadingDelete }
                >
                    Supprimer
                </LoadingButton>
            </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
