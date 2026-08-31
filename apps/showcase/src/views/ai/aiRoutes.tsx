import type { RouteObject } from 'react-router-dom'
import { AiChatView } from './AiChatView'
import { AiImageView } from './AiImageView'
import { AiWriterView } from './AiWriterView'

/** Routes for the `ai` area. Placeholders are replaced as screens land. */
export const aiRoutes: RouteObject[] = [
  { path: '/ai/chat', element: <AiChatView /> },
  { path: '/ai/image', element: <AiImageView /> },
  { path: '/ai/writer', element: <AiWriterView /> },
]
