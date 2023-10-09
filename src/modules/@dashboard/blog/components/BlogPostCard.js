import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Grid, Typography, CardContent, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// utils
import { fDate } from '../../../../utils/formatTime';
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

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default function BlogPostCard({ post, handleDelete, isReplay = false }) {
  const { title, rubrique, media, id } = post;
  const navigate = useNavigate()
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia sx={{
          ":hover": {
            cursor: "pointer"
          }
        }} onClick={() => navigate(`/dashboard/articles/detail/${post?.id}`)}>
          <StyledCover alt={title} src={isReplay ? post?.cover_image : media?.media_url} />
        </StyledCardMedia>
        <CardContent>

          <StyledTitle
            color="inherit"
            variant="subtitle2"
            underline="hover"
            sx={{
              ":hover": {
                cursor: "pointer"
              }
            }} onClick={() => navigate(`/dashboard/articles/detail/${post?.id}`)}
          >
            {title}
          </StyledTitle>

          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled' }}>
              {rubrique?.rubrique_title}
            </Typography>
            <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled' }}>
              {fDate(post?.created_at)}
            </Typography>
          </Box>

          <StyledInfo>

            <IconButton aria-label="edit" size="small" onClick={() => navigate(`/dashboard/articles/editArticle/${post?.id}`)}>
              <EditIcon fontSize="inherit" sx={{ color: 'gray' }} />
            </IconButton>

            <IconButton aria-label="delete" size="small">
              <DeleteIcon fontSize="inherit" color='error' onClick={() => handleDelete(post)} />
            </IconButton>

          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
}
