<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createResumePageModel } from './index.ts'
import { startStoryMotion } from './storyMotion.ts'
import { softSkills, softSkillTexts } from './softSkills.ts'
import { technologyFamilies, technologyTexts } from './technologies.ts'

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

const languageItems = computed(() =>
  page.value.availableLanguageCodes.map((code) => ({
    code,
    label: code.split('-')[0].toUpperCase(),
    active: code === page.value.languageCode,
  })),
)

const isPortuguesePage = computed(() => page.value.languageCode.toLowerCase().startsWith('pt'))

const featuredFamilies = technologyFamilies.filter((family) => family.head)
const plainFamilies = technologyFamilies.filter((family) => !family.head)

const hasStory = computed(() => !!page.value.storyHeaderHtml)

const pdfLabel = computed(() =>
  page.value.languageCode.toLowerCase().startsWith('pt') ? 'Baixar PDF' : 'Download PDF',
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

let stopStoryMotion = () => {}

watch(
  () => page.value.storyHeaderHtml,
  async () => {
    stopStoryMotion()
    await nextTick()
    stopStoryMotion = startStoryMotion()
  },
  { immediate: true, flush: 'post' },
)

const theme = ref<'light' | 'dark'>('light')

const applyTheme = (value: 'light' | 'dark') => {
  theme.value = value
  document.documentElement.dataset.theme = value

  try {
    localStorage.setItem('theme', value)
  } catch {
    // storage unavailable (private mode); the choice just won't persist
  }
}

const toggleTheme = () => applyTheme(theme.value === 'dark' ? 'light' : 'dark')

const themeLabel = computed(() => {
  const isPortuguese = page.value.languageCode.toLowerCase().startsWith('pt')

  if (theme.value === 'dark') {
    return isPortuguese ? 'Claro' : 'Light'
  }

  return isPortuguese ? 'Escuro' : 'Dark'
})

onMounted(() => {
  let saved: string | null = null

  try {
    saved = localStorage.getItem('theme')
  } catch {
    // ignore
  }

  applyTheme(
    saved === 'dark' || saved === 'light'
      ? saved
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light',
  )
})

onBeforeUnmount(() => stopStoryMotion())

const printPage = () => window.print()

const switchLanguage = (languageCode: string) =>
  router.replace({ path: route.path, query: { ...route.query, lang: languageCode }, hash: route.hash })
</script>

<template>
  <main class="resume-page" :lang="page.languageCode">
    <nav class="resume-topbar" aria-label="Resume">
      <div class="resume-topbar__seg" role="group" aria-label="Language">
        <button
          v-for="item in languageItems"
          :key="item.code"
          type="button"
          :aria-pressed="item.active"
          @click="switchLanguage(item.code)"
        >
          {{ item.label }}
        </button>
      </div>
      <button type="button" class="resume-topbar__pdf" @click="printPage">
        <span class="resume-topbar__pdf-icon"><i class="fa-solid fa-download" aria-hidden="true" /></span>
        <span class="resume-topbar__pdf-text">{{ pdfLabel }}<small>A4 · PDF</small></span>
      </button>
      <button
        type="button"
        role="switch"
        class="resume-topbar__seg resume-topbar__theme"
        :aria-checked="theme === 'dark'"
        :aria-label="themeLabel"
        :title="themeLabel"
        @click="toggleTheme"
      >
        <span :class="{ 'is-on': theme === 'light' }"><i class="fa-solid fa-sun" aria-hidden="true" /></span>
        <span :class="{ 'is-on': theme === 'dark' }"><i class="fa-solid fa-moon" aria-hidden="true" /></span>
      </button>
    </nav>

    <div class="resume-layout">
      <div id="top" class="resume-sheet">
        <div
          v-if="hasStory"
          class="resume-content resume-content--story-header"
          v-html="page.storyHeaderHtml"
        />
        <section v-if="hasStory" class="tech-map">
          <h2 class="tech-map__title">{{ isPortuguesePage ? technologyTexts.title.pt : technologyTexts.title.en }}</h2>
          <p class="tech-map__lead">{{ isPortuguesePage ? technologyTexts.lead.pt : technologyTexts.lead.en }}</p>

          <div class="tech-families">
            <article
              v-for="family in featuredFamilies"
              :key="family.id"
              class="tech-family"
              :class="{ 'tech-family--featured': family.head }"
              :style="{ '--hex': family.head?.hex || undefined }"
            >
              <header v-if="family.head" class="tech-head">
                <span class="tech-head__mark">
                  <svg v-if="family.head.svgPath" class="tech-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path :d="family.head.svgPath" />
                  </svg>
                  <i v-else class="tech-icon" :class="family.head.fa" aria-hidden="true" />
                </span>
                <div class="tech-head__body">
                  <h3 class="tech-head__name">{{ family.head.name }}</h3>
                  <p class="tech-head__usage">{{ isPortuguesePage ? family.head.usage.pt : family.head.usage.en }}</p>
                  <p class="tech-head__built-title">
                    {{ isPortuguesePage ? technologyTexts.builtLabel.pt : technologyTexts.builtLabel.en }}
                  </p>
                  <ul class="tech-head__built">
                    <li v-for="item in isPortuguesePage ? family.head.built?.pt : family.head.built?.en" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                  <p class="tech-jobs">
                    <span class="tech-jobs__label">{{ isPortuguesePage ? technologyTexts.jobsLabel.pt : technologyTexts.jobsLabel.en }}</span>
                    <a v-for="ref in family.head.jobs" :key="ref.id" class="tech-job" :href="`#${ref.id}`">{{ ref.label }}</a>
                  </p>
                </div>
              </header>
              <h3 v-else class="tech-family__title">{{ isPortuguesePage ? family.title?.pt : family.title?.en }}</h3>

              <p v-if="family.head" class="tech-family__around">
                {{ isPortuguesePage ? technologyTexts.withLabel.pt : technologyTexts.withLabel.en }}
              </p>
              <ul class="tech-members">
                <li v-for="tech in family.members" :key="tech.name" class="tech-member" :style="{ '--hex': tech.hex || undefined }">
                  <span class="tech-member__mark">
                    <svg v-if="tech.svgPath" class="tech-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path :d="tech.svgPath" />
                    </svg>
                    <i v-else class="tech-icon" :class="tech.fa" aria-hidden="true" />
                  </span>
                  <div class="tech-member__body">
                    <h4 class="tech-member__name">{{ tech.name }}</h4>
                    <p class="tech-member__usage">{{ isPortuguesePage ? tech.usage.pt : tech.usage.en }}</p>
                    <p v-if="tech.jobs.length" class="tech-jobs">
                      <a v-for="ref in tech.jobs" :key="ref.id" class="tech-job" :href="`#${ref.id}`">{{ ref.label }}</a>
                    </p>
                  </div>
                </li>
              </ul>
            </article>
          </div>
        </section>
        <div
          v-if="page.storyHtml"
          class="resume-content resume-content--story"
          v-html="page.storyHtml"
        />
        <section v-if="hasStory" class="tech-map soft-skills">
          <h2 class="tech-map__title">{{ isPortuguesePage ? softSkillTexts.title.pt : softSkillTexts.title.en }}</h2>
          <p class="tech-map__lead">{{ isPortuguesePage ? softSkillTexts.lead.pt : softSkillTexts.lead.en }}</p>
          <ul class="soft-grid">
            <li v-for="skill in softSkills" :key="skill.id" class="soft-card">
              <span class="soft-card__mark"><i class="tech-icon" :class="skill.fa" aria-hidden="true" /></span>
              <div>
                <h3 class="soft-card__title">{{ isPortuguesePage ? skill.title.pt : skill.title.en }}</h3>
                <p class="soft-card__text">{{ isPortuguesePage ? skill.description.pt : skill.description.en }}</p>
                <p class="tech-jobs">
                  <a v-for="ref in skill.jobs" :key="ref.id" class="tech-job" :href="`#${ref.id}`">{{ ref.label }}</a>
                </p>
              </div>
            </li>
          </ul>
        </section>
        <section v-if="hasStory" class="tech-map tech-map--more">
          <h2 class="tech-map__more-title">{{ isPortuguesePage ? technologyTexts.moreTitle.pt : technologyTexts.moreTitle.en }}</h2>
          <div class="tech-families">
            <article
              v-for="family in plainFamilies"
              :key="family.id"
              class="tech-family"
              :class="{ 'tech-family--featured': family.head }"
              :style="{ '--hex': family.head?.hex || undefined }"
            >
              <header v-if="family.head" class="tech-head">
                <span class="tech-head__mark">
                  <svg v-if="family.head.svgPath" class="tech-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path :d="family.head.svgPath" />
                  </svg>
                  <i v-else class="tech-icon" :class="family.head.fa" aria-hidden="true" />
                </span>
                <div class="tech-head__body">
                  <h3 class="tech-head__name">{{ family.head.name }}</h3>
                  <p class="tech-head__usage">{{ isPortuguesePage ? family.head.usage.pt : family.head.usage.en }}</p>
                  <p class="tech-head__built-title">
                    {{ isPortuguesePage ? technologyTexts.builtLabel.pt : technologyTexts.builtLabel.en }}
                  </p>
                  <ul class="tech-head__built">
                    <li v-for="item in isPortuguesePage ? family.head.built?.pt : family.head.built?.en" :key="item">
                      {{ item }}
                    </li>
                  </ul>
                  <p class="tech-jobs">
                    <span class="tech-jobs__label">{{ isPortuguesePage ? technologyTexts.jobsLabel.pt : technologyTexts.jobsLabel.en }}</span>
                    <a v-for="ref in family.head.jobs" :key="ref.id" class="tech-job" :href="`#${ref.id}`">{{ ref.label }}</a>
                  </p>
                </div>
              </header>
              <h3 v-else class="tech-family__title">{{ isPortuguesePage ? family.title?.pt : family.title?.en }}</h3>

              <p v-if="family.head" class="tech-family__around">
                {{ isPortuguesePage ? technologyTexts.withLabel.pt : technologyTexts.withLabel.en }}
              </p>
              <ul class="tech-members">
                <li v-for="tech in family.members" :key="tech.name" class="tech-member" :style="{ '--hex': tech.hex || undefined }">
                  <span class="tech-member__mark">
                    <svg v-if="tech.svgPath" class="tech-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path :d="tech.svgPath" />
                    </svg>
                    <i v-else class="tech-icon" :class="tech.fa" aria-hidden="true" />
                  </span>
                  <div class="tech-member__body">
                    <h4 class="tech-member__name">{{ tech.name }}</h4>
                    <p class="tech-member__usage">{{ isPortuguesePage ? tech.usage.pt : tech.usage.en }}</p>
                    <p v-if="tech.jobs.length" class="tech-jobs">
                      <a v-for="ref in tech.jobs" :key="ref.id" class="tech-job" :href="`#${ref.id}`">{{ ref.label }}</a>
                    </p>
                  </div>
                </li>
              </ul>
            </article>
          </div>
        </section>
        <div
          v-if="page.storyRestHtml"
          class="resume-content resume-content--story"
          v-html="page.storyRestHtml"
        />
        <div
          class="resume-content"
          :class="{ 'resume-content--print-only': hasStory }"
          v-html="page.renderedHtml"
        />
      </div>
    </div>
  </main>
</template>
