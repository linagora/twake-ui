import { IconProps } from '@linagora/twake-icons'
import React from 'react'

import type { WebviewService } from 'cozy-intent'

import { ListItemSize } from '../ListItem'
import { ActionTranslate } from './locales'

export type { ActionTranslate }

export interface ActionDocument {
  _id: string
  _type?: string
  name?: string
  dir_id?: string
  driveId?: string
  phone?: { number?: string }[]
  email?: { address?: string }[]
  cozyMetadata?: { favorite?: boolean; [key: string]: unknown }
  [key: string]: unknown
}

export interface ActionCallbackOptions {
  t: ActionTranslate
  /** Bridge to the native app, when the page runs inside it */
  webviewIntent?: WebviewService
  [key: string]: unknown
}

export interface ActionComponentProps {
  action: Action
  docs: ActionDocument[]
  autoFocus?: boolean
  disabled?: boolean
  onClick: (clickProps?: object) => void
  isListItem?: boolean
  size?: ListItemSize
}

export type ActionComponent = React.ComponentType<
  ActionComponentProps & React.RefAttributes<HTMLElement>
>

export interface ActionComponentSlotProps {
  Icon?: Partial<IconProps>
  ListItemText?: object
}

export interface Action<Options extends object = ActionCallbackOptions> {
  name: string
  icon?: IconProps['icon']
  label?: string
  /** Greys the action out, while still displaying it */
  disabled?: (docs: ActionDocument[]) => boolean
  displayCondition?: (docs: ActionDocument[]) => boolean
  componentProps?: ActionComponentSlotProps
  Component: ActionComponent
  /** Method syntax keeps each action free to narrow its own options */
  action?(docs: ActionDocument[], options: Options): unknown
}

/** An action keyed by its name, as built by `makeActions` */
export type ActionObject = Record<string, Action>

export type ActionFactory<FactoryOptions extends object = object> = (
  options: FactoryOptions
) => Action

export interface ShowAlertOptions {
  message: string
  severity: 'success' | 'error' | 'info' | 'warning'
  variant?: 'filled' | 'outlined' | 'standard'
}

export type ShowAlert = (options: ShowAlertOptions) => void

export interface WebLinkOptions {
  slug: string
  cozyUrl: string
  subDomainType: string
  pathname: string
  hash: string
}

export type GenerateWebLink = (options: WebLinkOptions) => string

export interface WebLinkClient {
  getStackClient: () => { uri: string }
  getInstanceOptions: () => { subdomain: string }
}

export interface WebLinkActionOptions {
  client: WebLinkClient
  generateWebLink: GenerateWebLink
}
