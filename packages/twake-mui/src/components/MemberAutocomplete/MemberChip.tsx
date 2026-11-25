import React from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import Chip, { ChipProps } from '../Chip/index.js'
import MemberOrGroupAvatar from '../MemberRow/MemberOrGroupAvatar.js'
import { locales } from '../MemberRow/locales/index.js'
import { Member } from '../MemberRow/types.js'

interface MemberChipProps {
  member: Member
  /** Props given by the Autocomplete for each picked member */
  itemProps: Omit<ChipProps, 'label' | 'avatar'>
}

const MemberChip = ({
  member,
  itemProps
}: MemberChipProps): React.JSX.Element => {
  useExtendI18n(locales)
  const { t } = useI18n()

  return (
    <Chip
      {...itemProps}
      label={member.name || t('MemberRow.defaultName')}
      avatar={<MemberOrGroupAvatar member={member} size="xs" />}
    />
  )
}

export default MemberChip
