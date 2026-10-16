import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from './AppShell'
import { PlayRoute } from './PlayRoute'
import { HomePage } from '@/features/home/HomePage'
import { AboutPage } from '@/features/about/AboutPage'
import { ProjectsPage } from '@/features/projects/ProjectsPage'
import { ProjectDetailPage } from '@/features/projects/ProjectDetailPage'
import { ArticlesPage } from '@/features/articles/ArticlesPage'
import { ArticleDetailPage } from '@/features/articles/ArticleDetailPage'
import { ContactPage } from '@/features/contact/ContactPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'articles', element: <ArticlesPage /> },
      { path: 'articles/:slug', element: <ArticleDetailPage /> },
      { path: 'play', element: <PlayRoute /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
])
