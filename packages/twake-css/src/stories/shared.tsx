import { Box, InputBase, Typography, useTheme } from '@linagora/twake-mui'
import React, { FC, ReactNode, createContext, useContext } from 'react'

export const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

export const Code: FC<{ children: ReactNode; tone?: 'class' | 'var' }> = ({
  children,
  tone = 'class'
}) => {
  const theme = useTheme()

  return (
    <Box
      component="code"
      sx={{
        fontFamily: MONO,
        fontSize: 13,
        lineHeight: 1.6,
        wordBreak: 'break-word',
        color:
          tone === 'var'
            ? theme.palette.text.primary
            : theme.palette.primary.main
      }}
    >
      {children}
    </Box>
  )
}

export const Swatch: FC<{ color: string; mode?: 'light' | 'dark' }> = ({
  color,
  mode
}) => (
  <Box
    data-theme={mode}
    sx={{
      width: 22,
      height: 22,
      flex: '0 0 auto',
      borderRadius: '5px',
      border: '1px solid',
      borderColor: 'divider',
      overflow: 'hidden',
      backgroundColor: mode
        ? 'var(--twake-palette-background-default)'
        : 'transparent'
    }}
  >
    <Box sx={{ width: 1, height: 1, backgroundColor: color }} />
  </Box>
)

export const Chapter: FC<{ id: string; title: string; children: ReactNode }> = ({
  id,
  title,
  children
}) => (
  <Box component="section" id={id} sx={{ pt: 7, scrollMarginTop: 108 }}>
    <Typography
      variant="h4"
      sx={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em' }}
    >
      {title}
    </Typography>
    {children}
  </Box>
)

export const Section: FC<{
  id?: string
  title: string
  note?: ReactNode
  children: ReactNode
}> = ({ id, title, note, children }) => (
  <Box id={id} sx={{ mt: 4, scrollMarginTop: 108 }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 2,
        pb: 1,
        mb: 2.5,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography sx={{ fontSize: 15, fontWeight: 600 }}>{title}</Typography>
      {note !== undefined && (
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
          {note}
        </Typography>
      )}
    </Box>
    {children}
  </Box>
)

export const Rail: FC<{ columns: string; children: ReactNode }> = ({
  columns,
  children
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: columns,
      alignItems: 'center',
      columnGap: 3,
      rowGap: 1.25
    }}
  >
    {children}
  </Box>
)

export const Prose: FC<{ children: ReactNode }> = ({ children }) => (
  <Typography
    variant="body1"
    color="text.secondary"
    sx={{ maxWidth: '68ch', mt: 1.5, fontSize: 15, lineHeight: 1.6 }}
  >
    {children}
  </Typography>
)

interface Filter {
  query: string
  setQuery: (value: string) => void
}

export const FilterContext = createContext<Filter>({
  query: '',
  setQuery: () => undefined
})

export const useFilter = (): Filter => useContext(FilterContext)

export const Nav: FC<{ groups: [string, string][][] }> = ({ groups }) => {
  const { query, setQuery } = useFilter()

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: 4,
        py: 1.5
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 3,
          maxWidth: 1180,
          mx: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            columnGap: 2,
            rowGap: 0.75,
            flex: 1
          }}
        >
          {groups.map((group, index) => (
            <React.Fragment key={group[0][0]}>
              {index > 0 && (
                <Box
                  aria-hidden
                  sx={{
                    width: '1px',
                    alignSelf: 'stretch',
                    backgroundColor: 'divider'
                  }}
                />
              )}
              {group.map(([id, label]) => (
                <Typography
                  key={id}
                  component="a"
                  href={`#${id}`}
                  sx={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: index === 0 ? 'text.primary' : 'text.secondary',
                    fontWeight: index === 0 ? 600 : 400,
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {label}
                </Typography>
              ))}
            </React.Fragment>
          ))}
        </Box>
        <InputBase
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Filter classes"
          inputProps={{ 'aria-label': 'Filter classes' }}
          sx={{
            flex: '0 0 auto',
            width: 170,
            fontFamily: MONO,
            fontSize: 13,
            px: 1.5,
            py: 0.5,
            borderRadius: '6px',
            backgroundColor: 'background.contrast'
          }}
        />
      </Box>
    </Box>
  )
}

export const Page: FC<{ children: ReactNode }> = ({ children }) => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      color: 'text.primary',
      minHeight: '100vh',
      pb: 10
    }}
  >
    {children}
  </Box>
)

export const Body: FC<{ children: ReactNode }> = ({ children }) => (
  <Box sx={{ maxWidth: 1180, mx: 'auto', px: 4 }}>{children}</Box>
)
