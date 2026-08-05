<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createResumePageModel } from './index.ts'

const route = useRoute()
const router = useRouter()
const isNavPinned = ref(false)
const resumeSheetRef = ref<HTMLDivElement | null>(null)

const selectedLanguageCode = computed(() => {
  const value = route.query.lang

  return typeof value === 'string' && value.trim() ? value : undefined
})

const page = computed(() => createResumePageModel(selectedLanguageCode.value))

const navigationItems = computed(() =>
  page.value.navigation.map((item, index) => ({
    ...item,
    href: `#${item.id}`,
    index: String(index + 1).padStart(2, '0'),
    indentClass:
      item.level <= 2 ? 'resume-nav__link--level-2' : `resume-nav__link--level-${item.level}`,
  })),
)

const languageItems = computed(() =>
  page.value.availableLanguageCodes.map((code) => ({
    code,
    label: code.toUpperCase(),
    active: code === page.value.languageCode,
  })),
)

const navTitleLabel = computed(() =>
  page.value.languageCode === 'pt-BR' ? 'Idioma' : 'Language',
)

const navSectionsLabel = computed(() =>
  page.value.languageCode === 'pt-BR' ? 'Seções' : 'Sections',
)

const navAriaLabel = computed(() =>
  page.value.languageCode === 'pt-BR' ? 'Navegação do currículo' : 'Resume navigation',
)

const languageGroupLabel = computed(() =>
  page.value.languageCode === 'pt-BR' ? 'Alternar idioma' : 'Language switch',
)

const navClass = computed(() => ({
  'resume-nav--pinned': isNavPinned.value,
}))

watchEffect(() => {
  document.title = `${page.value.pageTitle} | ${String(route.meta.title ?? 'Marcos Aurelio Costa de Oliveira')}`

  const description =
    document.head.querySelector<HTMLMetaElement>('meta[name="description"]')

  if (description) {
    description.content = page.value.metaDescription
  }
})

watchEffect(() => {
  const resolvedLanguageCode = page.value.languageCode

  if (selectedLanguageCode.value === resolvedLanguageCode) {
    return
  }

  router.replace({
    path: route.path,
    query: {
      ...route.query,
      lang: resolvedLanguageCode,
    },
    hash: route.hash,
  })
})

const switchLanguage = async (languageCode: string) => {
  if (languageCode === page.value.languageCode) {
    return
  }

  await router.replace({
    path: route.path,
    query: {
      ...route.query,
      lang: languageCode,
    },
    hash: route.hash,
  })
}

const downloadPdf = async () => {
  const element = resumeSheetRef.value?.querySelector('.resume-content')

  if (!element) {
    return
  }

  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const parsed = new DOMParser().parseFromString(
    `<div class="pdf-resume-root">${element.innerHTML}</div>`,
    'text/html',
  )
  const root = parsed.querySelector('.pdf-resume-root')

  if (!root) {
    return
  }

  const pageWidth = 210
  const pageHeight = 297
  const marginX = 18
  const marginTop = 18
  const marginBottom = 20
  const contentWidth = pageWidth - marginX * 2
  let cursorY = marginTop
  let hasRenderedSubtitle = false

  const ensureSpace = (neededMm: number) => {
    if (cursorY + neededMm > pageHeight - marginBottom) {
      doc.addPage()
      cursorY = marginTop
    }
  }

  const drawParagraph = (text: string, fontSize = 11, indent = 0) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, contentWidth - indent)
    const lineHeight = fontSize * 0.3528 * 1.25
    const blockHeight = lines.length * lineHeight
    ensureSpace(blockHeight + 1.5)

    lines.forEach((line: string, index: number) => {
      doc.text(line, marginX + indent, cursorY + index * lineHeight)
    })

    cursorY += blockHeight
  }

  const drawBullet = (text: string) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10.5)
    const bulletIndent = 5
    const textIndent = 9
    const lines = doc.splitTextToSize(text, contentWidth - textIndent)
    const lineHeight = 10.5 * 0.3528 * 1.25
    const blockHeight = lines.length * lineHeight
    ensureSpace(blockHeight + 1.5)

    doc.text('•', marginX + bulletIndent, cursorY)
    lines.forEach((line: string, index: number) => {
      doc.text(line, marginX + textIndent, cursorY + index * lineHeight)
    })

    cursorY += blockHeight
  }

  Array.from(root.children).forEach((node) => {
    const tag = node.tagName.toLowerCase()
    const text = node.textContent?.trim() ?? ''

    if (tag === 'h1') {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(18)
      ensureSpace(8)
      doc.text(text, marginX, cursorY)
      cursorY += 6.5
      return
    }

    if (tag === 'h2') {
      const isSubtitle = !hasRenderedSubtitle
      doc.setFont('helvetica', isSubtitle ? 'normal' : 'bold')
      const fontSize = isSubtitle ? 11.5 : 13
      doc.setFontSize(fontSize)
      ensureSpace(fontSize * 0.3528 * 1.5 + 2)

      doc.text(text, marginX, cursorY)
      cursorY += fontSize * 0.3528 * (isSubtitle ? 1.35 : 1.1)

      if (isSubtitle) {
        hasRenderedSubtitle = true
      } else {
        doc.setDrawColor(208, 208, 208)
        doc.line(marginX, cursorY, pageWidth - marginX, cursorY)
        cursorY += 2.5
      }
      return
    }

    if (tag === 'h3') {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11.25)
      ensureSpace(8)
      doc.text(text, marginX, cursorY)
      cursorY += 4.8
      return
    }

    if (tag === 'p') {
      if (!text) {
        return
      }
      drawParagraph(text, 10.5)
      cursorY += 1.5
      return
    }

    if (tag === 'ul') {
      Array.from(node.querySelectorAll('li')).forEach((item) => {
        drawBullet(item.textContent?.trim() ?? '')
      })
      cursorY += 1.5
      return
    }

    if (tag === 'dl') {
      Array.from(node.children).forEach((child) => {
        const childTag = child.tagName.toLowerCase()

        if (childTag === 'dt') {
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(10.5)
          ensureSpace(5)
          doc.text(child.textContent?.trim() ?? '', marginX, cursorY)
          cursorY += 4.5
        }

        if (childTag === 'dd') {
          drawParagraph(child.textContent?.trim() ?? '', 10.5, 4)
        }
      })
      cursorY += 1
      return
    }
  })

  const blob = doc.output('blob')
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'resume.pdf'
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

const toggleNav = () => {
  isNavPinned.value = !isNavPinned.value
}
</script>

<template>
  <main class="resume-page" :lang="page.languageCode">
    <div class="resume-layout">
      <nav
        v-if="navigationItems.length || languageItems.length"
        class="resume-nav group"
        :class="navClass"
        :aria-label="navAriaLabel"
      >
        <p class="resume-nav__title">{{ navTitleLabel }}</p>
        <div
          v-if="languageItems.length"
          class="resume-nav__language-switch"
          role="group"
          :aria-label="languageGroupLabel"
        >
          <button
            v-for="item in languageItems"
            :key="item.code"
            type="button"
            class="resume-nav__language-button"
            :class="{ 'resume-nav__language-button--active': item.active }"
            :aria-pressed="item.active"
            @click="switchLanguage(item.code)"
          >
            {{ item.label }}
          </button>
        </div>
        <p v-if="navigationItems.length" class="resume-nav__title resume-nav__title--sections">
          {{ navSectionsLabel }}
        </p>
        <a
          v-for="item in navigationItems"
          :key="item.href"
          class="resume-nav__link"
          :class="item.indentClass"
          :href="item.href"
        >
          <span class="resume-nav__index" aria-hidden="true">
            {{ item.index }}
          </span>
          <span class="resume-nav__label">{{ item.label }}</span>
        </a>
        <button
          type="button"
          class="resume-nav__button resume-nav__button--toggle"
          @click="toggleNav"
        >
          <span class="resume-nav__index" aria-hidden="true">
            {{ isNavPinned ? '−−' : '≡' }}
          </span>
          <span class="resume-nav__label">
            {{ isNavPinned ? 'Recolher' : 'Expandir' }}
          </span>
        </button>
        <button
          type="button"
          class="resume-nav__button resume-nav__button--pdf"
          @click="downloadPdf"
        >
          <span class="resume-nav__index" aria-hidden="true">PDF</span>
          <span class="resume-nav__label">Baixar PDF</span>
        </button>
      </nav>

      <div id="top" ref="resumeSheetRef" class="resume-sheet">
        <div class="resume-content" v-html="page.renderedHtml" />
      </div>
    </div>
  </main>
</template>
