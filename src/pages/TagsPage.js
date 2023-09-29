import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Button, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../modules/@dashboard/products/components/index';
// mock
import PRODUCTS from '../_mock/products';
import ModalFormTags from '../modules/@dashboard/tags/components/ModalFormTags';
import AllTags from '../modules/@dashboard/tags/components/AllTags';
import useAllTags from '../modules/@dashboard/tags/hooks/useAllTags';
import LinearLoader from '../components/loader/LinearLoader';

// ----------------------------------------------------------------------

export default function TagsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const tagsData = useAllTags()
  const { isLoading, data, refetch } = tagsData
  // console.log(data?.data);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Helmet>
        <title> Admin Tags </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

          <Typography variant="h4" gutterBottom>
            Liste des tags
          </Typography>
          <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Nouveau tag
          </Button>

        </Stack>
        {isLoading ? <LinearLoader /> :
          <AllTags products={data?.data} />
        }
      </Container>
      <ModalFormTags open={open} onClose={handleClose} />
    </>
  );
}
