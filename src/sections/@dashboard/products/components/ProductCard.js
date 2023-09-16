import PropTypes from 'prop-types';
// @mui
import { IconButton, Box, Card, Link, Typography, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
// utils
// components

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { name } = product;

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 2 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            # {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack component="span" fontSize='small' color='gray'>
            on 6 May 2023
          </Stack>

          <Box>
            <IconButton size='small' aria-label="delete">
              <EditIcon fontSize='small' color='inherit' />
            </IconButton>
            
            <IconButton size='small' aria-label="delete">
              <ClearIcon fontSize='small' color='error' />
            </IconButton>
          </Box>

        </Stack>
      </Stack>
    </Card>
  );
}
