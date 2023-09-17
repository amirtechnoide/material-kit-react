import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Button, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../modules/@dashboard/products/components/index';
// mock

import AllRubrique from '../modules/@dashboard/rubriques/components/AllRubrique';
import useAllRubriques from '../modules/@dashboard/rubriques/hooks/useAllRubriques';
import ModalFormRubrique from '../modules/@dashboard/rubriques/components/ModalFormRubrique';
import LinearLoader from '../components/loader/LinearLoader';

// ----------------------------------------------------------------------

export default function Rubriques() {
    const [openFilter, setOpenFilter] = useState(false);
    const rubriqueData = useAllRubriques()
    const { isLoading, data, refetch } = rubriqueData
    console.log(data)
    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // if (isLoading) {
    //     return <LinearLoader />
    // }
    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

                    <Typography variant="h4" gutterBottom>
                        Liste des rubriques
                    </Typography>
                    <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        Nouvelle rubrique
                    </Button>

                </Stack>
                {isLoading ? <LinearLoader /> :
                    <AllRubrique products={data?.data} />
                }
            </Container>
            <ModalFormRubrique open={open} onClose={handleClose} />
        </>
    );
}
