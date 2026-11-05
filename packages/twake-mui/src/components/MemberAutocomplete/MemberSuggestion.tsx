import { ListItemIcon } from '@mui/material'
import React from 'react'

import { useExtendI18n, useI18n } from 'twake-i18n'

import ListItem from '../ListItem'
import ListItemText from '../ListItemText'
import MemberOrGroupAvatar from '../MemberRow/MemberOrGroupAvatar'
import { locales } from '../MemberRow/locales'
import { Member } from '../MemberRow/types'

interface MemberSuggestionProps {
  suggestion: Member
}

const MemberSuggestion = ({
  suggestion
}: MemberSuggestionProps): React.JSX.Element => {
  useExtendI18n(locales)
  const { t } = useI18n()

  return (
    <ListItem component="div">
      <ListItemIcon>
        <MemberOrGroupAvatar member={suggestion} size="m" />
      </ListItemIcon>
      <ListItemText
        primary={suggestion.name || t('MemberRow.defaultName')}
        secondary={suggestion.subtitle}
      />
    </ListItem>
  )
}

export default MemberSuggestion
