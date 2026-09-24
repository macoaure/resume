<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createResumePageModel } from './index.ts'

const route = useRoute()
const router = useRouter()

const selectedLanguageCode = computed(() => {
  const value = route.query.lang

  return typeof value === 'string' && value.trim() ? value : undefined
})

const isCompactSelected = computed(() => route.query.compact === '1')

const selectedPersonId = computed(() => {
  const value = route.query.person

  return typeof value === 'string' && value.trim() ? value : undefined
})

const page = computed(() =>
  createResumePageModel(selectedLanguageCode.value, isCompactSelected.value, selectedPersonId.value),
)

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

const isPortuguesePage = computed(() => {
  const code = page.value.languageCode.toLowerCase()

  return code.startsWith('pt') || code.endsWith('pt-br')
})

const navTitleLabel = computed(() =>
  isPortuguesePage.value ? 'Idioma' : 'Language',
)

const formatTitleLabel = computed(() =>
  isPortuguesePage.value ? 'Formato' : 'Format',
)

const navSectionsLabel = computed(() =>
  isPortuguesePage.value ? 'Seções' : 'Sections',
)

const navAriaLabel = computed(() =>
  isPortuguesePage.value ? 'Navegação do currículo' : 'Resume navigation',
)

const languageGroupLabel = computed(() =>
  isPortuguesePage.value ? 'Alternar idioma' : 'Language switch',
)

const compactButtonLabel = computed(() =>
  isPortuguesePage.value ? 'Compacto' : 'Compact',
)

const personTitleLabel = computed(() =>
  isPortuguesePage.value ? 'Pessoa' : 'Person',
)

const personGroupLabel = computed(() =>
  isPortuguesePage.value ? 'Alternar currículo' : 'Resume switch',
)

const personItems = computed(() =>
  page.value.availablePeople.map((person) => ({
    ...person,
    active: person.id === page.value.personId,
  })),
)

const pdfButtonLabel = computed(() =>
  isPortuguesePage.value ? 'Baixar PDF' : 'Download PDF',
)

watchEffect(() => {
  document.title = `${page.value.pageTitle} | ${page.value.personDisplayName}`

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

const switchPerson = async (personId: string) => {
  if (personId === page.value.personId) {
    return
  }

  await router.replace({
    path: route.path,
    query: {
      ...route.query,
      person: personId === 'marcos' ? undefined : personId,
      lang: page.value.languageCode,
    },
    hash: route.hash,
  })
}

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

const toggleCompact = async () => {
  await router.replace({
    path: route.path,
    query: {
      ...route.query,
      lang: page.value.languageCode,
      compact: page.value.isCompact ? undefined : '1',
    },
    hash: route.hash,
  })
}

const downloadPdf = () => {
  window.print()
}

</script>

<template>
  <main class="resume-page" :lang="page.languageCode">
    <div class="resume-layout">
      <nav
        v-if="navigationItems.length || languageItems.length"
        class="resume-nav"
        :aria-label="navAriaLabel"
      >
        <p class="resume-nav__title">{{ personTitleLabel }}</p>
        <div
          v-if="personItems.length > 1"
          class="resume-nav__language-switch"
          role="group"
          :aria-label="personGroupLabel"
        >
          <button
            v-for="item in personItems"
            :key="item.id"
            type="button"
            class="resume-nav__language-button"
            :class="{ 'resume-nav__language-button--active': item.active }"
            :aria-pressed="item.active"
            @click="switchPerson(item.id)"
          >
            {{ item.label }}
          </button>
        </div>
        <p class="resume-nav__title resume-nav__title--sections">{{ navTitleLabel }}</p>
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
        <p class="resume-nav__title resume-nav__title--sections">
          {{ formatTitleLabel }}
        </p>
        <button
          type="button"
          class="resume-nav__button"
          :class="{ 'resume-nav__button--active': page.isCompact }"
          :aria-pressed="page.isCompact"
          @click="toggleCompact"
        >
          <span class="resume-nav__index" aria-hidden="true">1P</span>
          <span class="resume-nav__label">{{ compactButtonLabel }}</span>
        </button>
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
          class="resume-nav__button resume-nav__button--pdf"
          @click="downloadPdf"
        >
          <span class="resume-nav__index" aria-hidden="true">PDF</span>
          <span class="resume-nav__label">{{ pdfButtonLabel }}</span>
        </button>
      </nav>

      <div id="top" class="resume-sheet">
        <div class="resume-content" v-html="page.renderedHtml" />
      </div>
    </div>
  </main>
</template>
