// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Articles',
    path: '/dashboard/articles',
    icon: icon('i_articles'),
  },
  {
    title: 'Tags',
    path: '/dashboard/tags',
    icon: icon('ic_tags'),
  },
  {
    title: 'Rubriques',
    path: '/dashboard/rubriques',
    icon: icon('ic_rubriques'),
  },
  {
    title: 'Replays',
    path: '/dashboard/replays',
    icon: icon('ic_replays'),
  },
];

export default navConfig;
