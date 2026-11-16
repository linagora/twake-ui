import { Link, Typography } from '@mui/material'
import React from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import IllustrationDialog from './IllustrationDialog'
import appStoreIcon from './images/appStore.png'
import defaultQrCode from './images/installFlagshipAppQrCode.png'
import playStoreIcon from './images/playStore.png'
import { locales } from './locales'

export interface InstallFlagshipAppDialogProps {
  onClose?: () => void
  /** Play Store link of the description */
  playStoreUrl?: string
  /** App Store link of the description */
  appStoreUrl?: string
  /** Image of a QR code leading to the download page of the app */
  QRCode?: string
}

/** Invites to install the mobile app, through a QR code or the stores */
const InstallFlagshipAppDialog = ({
  onClose,
  playStoreUrl = 'https://play.google.com/store/apps/details?id=io.cozy.flagship.mobile',
  appStoreUrl = 'https://apps.apple.com/app/my-cozy/id1600636174',
  QRCode = defaultQrCode
}: InstallFlagshipAppDialogProps): React.ReactElement => {
  useExtendI18n(locales)
  const { t } = useI18n()

  return (
    <IllustrationDialog
      open
      size="small"
      onClose={onClose}
      componentsProps={{ dialogTitle: { className: 'u-pt-2-half' } }}
      title={
        <Link
          href="https://cozy.io/download"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={QRCode} width="100%" alt="" aria-hidden />
          <span className="u-visuallyhidden">
            {t('Dialogs.installFlagshipApp.linkLabel')}
          </span>
        </Link>
      }
      content={
        <div className="u-ta-center">
          <Typography gutterBottom variant="h3" color="text.primary">
            {t('Dialogs.installFlagshipApp.title')}
          </Typography>
          <Typography
            color="text.secondary"
            className="u-ta-center"
            dangerouslySetInnerHTML={{
              __html: t('Dialogs.installFlagshipApp.text', {
                androidUrl: playStoreUrl,
                androidIconSrc: playStoreIcon,
                iosUrl: appStoreUrl,
                iosIconSrc: appStoreIcon
              })
            }}
          />
        </div>
      }
    />
  )
}

export default InstallFlagshipAppDialog
