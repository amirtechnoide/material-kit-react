import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import TagsPage from './pages/TagsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import Rubriques from './pages/Rubriques';
import AddArticlePage from './pages/AddArticlePage';
import Replays from './pages/Replays';

// ----------------------------------------------------------------------

export default function Router() {
  const isAuthenticated = !!localStorage.getItem('token')

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'tags', element: <TagsPage /> },
        { path: 'rubriques', element: <Rubriques /> },
        { path: 'articles/addArticle', element: <AddArticlePage /> },
        { path: 'articles', element: <BlogPage /> },
        { path: 'replays', element: <Replays /> },
      ],
    },
    {
      path: 'login',
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
