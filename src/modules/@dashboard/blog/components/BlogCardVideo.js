import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Typography, CardContent } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
//
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

BlogCardVideo.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogCardVideo({ post }) {
  const { title, view, comment, share } = post;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia>
          <StyledCover alt={title} src={post?.cover_image} />
        </StyledCardMedia>

        <CardContent>
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(post?.created_at)}
          </Typography>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
          >
            {title}
          </StyledTitle>

          <StyledInfo>
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
