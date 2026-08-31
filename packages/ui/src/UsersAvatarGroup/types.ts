import type { AvatarGroupProps, AvatarProps } from '../Avatar'

export type UserDataObject = Record<string, unknown>

export interface UsersAvatarGroupProps {
  /** Props for Avatar.Group. @default {} */
  avatarGroupProps?: AvatarGroupProps
  /** Props for Avatar. @default {} */
  avatarProps?: Partial<AvatarProps>
  /** Property key to identify image source. @default 'img' */
  imgKey?: string
  /** Property key to identify avatar name. @default 'name' */
  nameKey?: string
  /** Callback when an avatar is clicked. */
  onAvatarClick?: (data: UserDataObject) => void
  /** Users data. @default [] */
  users?: UserDataObject[]
}
