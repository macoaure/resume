export type ResumePageModel = {
  renderedHtml: string
  navigation: ResumeNavigationItem[]
  languageCode: string
  availableLanguageCodes: string[]
  personId: string
  availablePeople: ResumePerson[]
  personDisplayName: string
  isCompact: boolean
  pageTitle: string
  metaDescription: string
}

export type ResumePerson = {
  id: string
  label: string
}

const DEFAULT_LANGUAGE_CODE = 'pt-BR'
const DEFAULT_PERSON_ID = 'marcos'

const PERSON_PROFILE: Record<
  string,
  { label: string; displayName: string; metaPt: string; metaEn: string }
> = {
  marcos: {
    label: 'Marcos',
    displayName: 'Marcos Aurelio Costa de Oliveira',
    metaPt:
      'Currículo de Marcos Aurelio Costa de Oliveira, Software Architect e Senior Backend Engineer, com foco em arquitetura, cloud e integração.',
    metaEn:
      'Resume for Marcos Aurelio Costa de Oliveira, Software Architect and Senior Backend Engineer focused on architecture, cloud, and integration.',
  },
  camila: {
    label: 'Camila',
    displayName: 'Camila Costa de Oliveira',
    metaPt:
      'Currículo de Camila Costa de Oliveira, analista de marketing e redes sociais com experiência em varejo e atacado.',
    metaEn:
      'Resume for Camila Costa de Oliveira, a marketing and social media analyst with retail and wholesale experience.',
  },
}

const resumeMarkdownModules = import.meta.glob<string>(
  ['../../resumes/resume-*.md', '../../resumes/*/resume-*.md'],
  {
    eager: true,
    import: 'default',
    query: '?raw',
  },
)

const availableResumeEntries = Object.entries(resumeMarkdownModules).map(([path, markdown]) => ({
  path,
  markdown,
  personId: extractPersonId(path),
  languageCode: extractLanguageCode(path),
  normalizedLanguageCode: extractLanguageCode(path).toLowerCase(),
  isCompact: path.includes('resume-compact-'),
}))

export type ResumeNavigationItem = {
  id: string
  label: string
  level: number
}

export function createResumePageModel(
  languageCode?: string,
  isCompact = false,
  personId?: string,
): ResumePageModel {
  const resolvedPersonId = resolvePersonId(personId)
  const resumeMarkdown = resolveResumeMarkdown(
    languageCode ?? resolvePreferredLanguageCode(resolvedPersonId),
    isCompact,
    resolvedPersonId,
  )
  const resolvedLanguageCode = extractLanguageCode(resumeMarkdown.path)
  const { renderedHtml, navigation } = renderMarkdownToHtml(resumeMarkdown.markdown, resolvedLanguageCode)
  const isPortuguese = isPortugueseLanguageCode(resolvedLanguageCode)
  const profile = PERSON_PROFILE[resolvedPersonId] ?? PERSON_PROFILE[DEFAULT_PERSON_ID]

  return {
    renderedHtml,
    navigation,
    languageCode: resolvedLanguageCode,
    availableLanguageCodes: getAvailableLanguageCodes(resolvedPersonId),
    personId: resolvedPersonId,
    availablePeople: getAvailablePeople(),
    personDisplayName: profile.displayName,
    isCompact: resumeMarkdown.isCompact,
    pageTitle: isPortuguese ? 'Currículo' : 'Resume',
    metaDescription: isPortuguese ? profile.metaPt : profile.metaEn,
  }
}

function resolveResumeMarkdown(
  languageCode: string,
  isCompact: boolean,
  personId: string,
): {
  path: string
  markdown: string
  isCompact: boolean
} {
  return (
    findResumeEntry(languageCode, isCompact, personId) ??
    findResumeEntry(languageCode, false, personId) ??
    getDefaultResumeEntry(personId)
  )
}

function resolvePersonId(personId?: string): string {
  const availableIds = new Set(availableResumeEntries.map((entry) => entry.personId))

  if (personId && availableIds.has(personId)) {
    return personId
  }

  return availableIds.has(DEFAULT_PERSON_ID) ? DEFAULT_PERSON_ID : availableResumeEntries[0].personId
}

function getAvailablePeople(): ResumePerson[] {
  const ids = Array.from(new Set(availableResumeEntries.map((entry) => entry.personId)))
  const defaultIndex = ids.indexOf(DEFAULT_PERSON_ID)

  if (defaultIndex > 0) {
    ids.splice(defaultIndex, 1)
    ids.unshift(DEFAULT_PERSON_ID)
  }

  return ids.map((id) => ({
    id,
    label: PERSON_PROFILE[id]?.label ?? id,
  }))
}

function resolvePreferredLanguageCode(personId = DEFAULT_PERSON_ID): string {
  const resolvedPersonId = resolvePersonId(personId)

  if (typeof navigator !== 'undefined') {
    for (const candidate of navigator.languages ?? []) {
      const matched = findResumeEntry(candidate, false, resolvedPersonId)
      if (matched) {
        return matched.languageCode
      }
    }

    if (navigator.language) {
      const matched = findResumeEntry(navigator.language, false, resolvedPersonId)
      if (matched) {
        return matched.languageCode
      }
    }
  }

  return DEFAULT_LANGUAGE_CODE
}

function findResumeEntry(
  languageCode: string,
  isCompact: boolean,
  personId: string,
):
  | {
      path: string
      markdown: string
      personId: string
      languageCode: string
      normalizedLanguageCode: string
      isCompact: boolean
    }
  | undefined {
  const normalizedLanguageCode = languageCode.toLowerCase()
  const personEntries = availableResumeEntries.filter((entry) => entry.personId === personId)
  const exactMatch = personEntries.find(
    (entry) =>
      entry.isCompact === isCompact && entry.normalizedLanguageCode === normalizedLanguageCode,
  )

  if (exactMatch) {
    return exactMatch
  }

  const primaryLanguageCode = normalizedLanguageCode.split('-')[0]
  const primaryMatch = personEntries.find(
    (entry) =>
      entry.isCompact === isCompact &&
      (entry.normalizedLanguageCode === primaryLanguageCode ||
        entry.normalizedLanguageCode.startsWith(`${primaryLanguageCode}-`)),
  )

  return primaryMatch
}

function getDefaultResumeEntry(personId: string): {
  path: string
  markdown: string
  isCompact: boolean
} {
  const personEntries = availableResumeEntries.filter((entry) => entry.personId === personId)

  return (
    personEntries.find(
      (entry) =>
        !entry.isCompact && entry.normalizedLanguageCode === DEFAULT_LANGUAGE_CODE.toLowerCase(),
    ) ??
    personEntries.find((entry) => !entry.isCompact) ??
    personEntries[0] ??
    availableResumeEntries[0]
  )
}

function getAvailableLanguageCodes(personId: string): string[] {
  const codes = Array.from(
    new Set(
      availableResumeEntries
        .filter((entry) => entry.personId === personId && !entry.isCompact)
        .map((entry) => entry.languageCode),
    ),
  )
  const defaultIndex = codes.indexOf(DEFAULT_LANGUAGE_CODE)

  if (defaultIndex > 0) {
    codes.splice(defaultIndex, 1)
    codes.unshift(DEFAULT_LANGUAGE_CODE)
  }

  return codes
}

function extractPersonId(path: string): string {
  const match = path.match(/resumes\/([^/]+)\/resume-/)

  return match?.[1] ?? DEFAULT_PERSON_ID
}

function extractLanguageCode(path: string): string {
  const match = path.match(/resume-(?:compact-)?([^/]+)\.md$/)

  return normalizeLanguageCode(match?.[1] ?? DEFAULT_LANGUAGE_CODE)
}

function normalizeLanguageCode(languageCode: string): string {
  return languageCode.toLowerCase() === 'pt-br' ? 'pt-BR' : languageCode
}

function escapeHtml(source: string): string {
  return source
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

// Configurable date rendering: one format style + one locale/label table govern every <time> tag.
const DATE_DISPLAY_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' }
const LOCALE_BY_LANGUAGE_CODE: Record<string, string> = { en: 'en-US', 'pt-br': 'pt-BR' }
const PRESENT_LABEL_BY_LANGUAGE_CODE: Record<string, string> = { en: 'Present', 'pt-br': 'Atual' }

function isPortugueseLanguageCode(languageCode: string): boolean {
  const normalized = languageCode.toLowerCase()

  return normalized.startsWith('pt')
}

function resolveByLanguageCode<T>(table: Record<string, T>, languageCode: string, fallback: T): T {
  const normalized = languageCode.toLowerCase()

  return table[normalized] ?? table[normalized.split('-')[0]] ?? fallback
}

function renderTimeTag(datetimeValue: string, languageCode: string): string {
  if (datetimeValue === 'present') {
    const label = resolveByLanguageCode(PRESENT_LABEL_BY_LANGUAGE_CODE, languageCode, 'Present')

    return `<time datetime="${datetimeValue}">${label}</time>`
  }

  const locale = resolveByLanguageCode(LOCALE_BY_LANGUAGE_CODE, languageCode, 'en-US')
  const [year, month, day] = datetimeValue.split('-').map(Number)
  const date = new Date(Date.UTC(year, (month || 1) - 1, day || 1))
  const formatted = new Intl.DateTimeFormat(locale, { ...DATE_DISPLAY_FORMAT, timeZone: 'UTC' }).format(date)
  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)

  return `<time datetime="${datetimeValue}">${capitalized}</time>`
}

function renderInlineMarkdown(source: string, languageCode: string): string {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|<time datetime="([^"]+)">([^<]*)<\/time>/g
  let result = ''
  let lastIndex = 0

  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0
    const [fullMatch, linkText, href, datetimeValue] = match

    result += renderInlineText(source.slice(lastIndex, index))
    result +=
      datetimeValue !== undefined
        ? renderTimeTag(datetimeValue, languageCode)
        : `<a href="${escapeHtml(href)}">${renderInlineText(linkText)}</a>`
    lastIndex = index + fullMatch.length
  }

  result += renderInlineText(source.slice(lastIndex))

  return result
}

function renderInlineText(source: string): string {
  const escaped = escapeHtml(source)

  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
}

export function renderMarkdownToHtml(
  source: string,
  languageCode: string = DEFAULT_LANGUAGE_CODE,
): {
  renderedHtml: string
  navigation: ResumeNavigationItem[]
} {
  const blocks: string[] = []
  const lines = source.split(/\r?\n/)
  let paragraphBuffer: string[] = []
  let listItems: string[] = []
  const headingIds = new Map<string, number>()
  const navigation: ResumeNavigationItem[] = []

  const flushParagraph = () => {
    if (!paragraphBuffer.length) {
      return
    }

    blocks.push(`<p>${renderInlineMarkdown(paragraphBuffer.join(' '), languageCode)}</p>`)
    paragraphBuffer = []
  }

  const flushList = () => {
    if (!listItems.length) {
      return
    }

    blocks.push(
      `<ul>${listItems.map((item) => `<li>${renderInlineMarkdown(item, languageCode)}</li>`).join('')}</ul>`,
    )
    listItems = []
  }

  const flushAll = () => {
    flushParagraph()
    flushList()
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim()

    if (!line) {
      flushAll()
      continue
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      flushAll()

      const level = headingMatch[1].length
      const content = headingMatch[2] || 'Untitled section'
      const headingId = createHeadingId(content, headingIds)
      if (level === 2) {
        navigation.push({
          id: headingId,
          label: content,
          level,
        })
      }
      blocks.push(
        `<h${level} id="${headingId}">${renderInlineMarkdown(content, languageCode)}</h${level}>`,
      )
      continue
    }

    const bulletMatch = line.match(/^[-*+]\s+(.*)$/)
    if (bulletMatch) {
      flushParagraph()
      listItems.push(bulletMatch[1])
      continue
    }

    const nextLine = lines[index + 1]?.trim() ?? ''
    const looksLikeDefinitionList = nextLine.startsWith(':')

    if (looksLikeDefinitionList) {
      flushAll()

      const items: string[] = [renderInlineMarkdown(line, languageCode)]

      while (index + 1 < lines.length) {
        const candidate = lines[index + 1].trim()
        if (!candidate) {
          break
        }
        if (!candidate.startsWith(':')) {
          break
        }

        items.push(renderInlineMarkdown(candidate.replace(/^:\s*/, ''), languageCode))
        index += 1
      }

      blocks.push(
        `<dl><dt>${items[0]}</dt>${items
          .slice(1)
          .map((item) => `<dd>${item}</dd>`)
          .join('')}</dl>`,
      )
      continue
    }

    flushList()
    paragraphBuffer.push(line)
  }

  flushAll()

  return {
    renderedHtml: blocks.join('\n'),
    navigation,
  }
}

function createHeadingId(heading: string, headingIds: Map<string, number>): string {
  const baseId = heading
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  const normalized = baseId || 'section'
  const count = headingIds.get(normalized) ?? 0

  headingIds.set(normalized, count + 1)

  return count === 0 ? normalized : `${normalized}-${count + 1}`
}
