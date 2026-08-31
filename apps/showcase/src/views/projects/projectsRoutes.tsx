import type { RouteObject } from 'react-router-dom'
import { ProjectDetailView } from './ProjectDetailView'
import { ProjectListView } from './ProjectListView'
import { ProjectSettingsView } from './ProjectSettingsView'
import { ProjectTasksView } from './ProjectTasksView'
import { ProjectTimelineView } from './ProjectTimelineView'
import { ProjectsDashboardView } from './ProjectsDashboardView'
import { ScrumBoardView } from './ScrumBoardView'

/** Routes for the `projects` area. */
export const projectsRoutes: RouteObject[] = [
  { path: '/projects/dashboard', element: <ProjectsDashboardView /> },
  { path: '/projects/list', element: <ProjectListView /> },
  { path: '/projects/scrumboard', element: <ScrumBoardView /> },
  { path: '/projects/timeline', element: <ProjectTimelineView /> },
  { path: '/projects/tasks', element: <ProjectTasksView /> },
  { path: '/projects/settings', element: <ProjectSettingsView /> },
  { path: '/projects/:id', element: <ProjectDetailView /> },
]
