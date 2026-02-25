import { ref, computed } from 'vue'
import type { Ref } from 'vue'

export type Locale = 'en' | 'zh'

const en = {
  greeting: {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    night: 'Good night',
  },
  sections: {
    moments: 'Moments',
    journal: 'Journal',
    seeAll: 'See all',
    entries: '{n} entries',
  },
  moments: {
    empty: 'No moments yet',
    emptyHint: 'Photos you take will appear here.',
    photos: '{n} photos',
  },
  nav: {
    now: 'Now',
    then: 'Then',
    track: 'Track',
    context: 'Me',
    settings: 'Settings',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    languageHint: 'Choose your preferred language',
  },
  context: {
    title: 'Me',
    tagsSection: 'Tags',
    budgetSection: 'Budget',
    budgetHint: 'Set a spending limit to stay on track',
    monthly: 'Monthly',
    daily: 'Daily',
    budgetAmount: 'Amount',
    defaultTags: {
      transportation: 'Transportation',
      dining: 'Dining',
      work: 'Work',
      entertainment: 'Entertainment',
      shopping: 'Shopping',
      grocery: 'Grocery'
    }
  },
}

const zh: typeof en = {
  greeting: {
    morning: '早上好',
    afternoon: '下午好',
    evening: '晚上好',
    night: '晚安',
  },
  sections: {
    moments: '瞬间',
    journal: '日记',
    seeAll: '查看全部',
    entries: '{n} 篇',
  },
  moments: {
    empty: '暂无照片',
    emptyHint: '拍摄的照片会显示在这里',
    photos: '{n} 张照片',
  },
  nav: {
    now: '此刻',
    then: '回顾',
    track: '记录',
    context: '我的',
    settings: '设置',
  },
  settings: {
    title: '设置',
    language: '语言',
    languageHint: '选择你偏好的语言',
  },
  context: {
    title: '我的',
    tagsSection: '标签',
    budgetSection: '预算',
    budgetHint: '设定消费额度，合理控制支出',
    monthly: '每月',
    daily: '每天',
    budgetAmount: '金额',
    defaultTags: {
      transportation: '交通',
      dining: '餐饮',
      work: '工作',
      entertainment: '娱乐',
      shopping: '购物',
      grocery: '买菜'
    }
  },
}

const messages: Record<Locale, typeof en> = { en, zh }

// Global reactive locale state (persists across component boundaries but resets on full reload)
const _currentLocale = ref<Locale>('zh') as Ref<Locale>

export function useI18n() {
  const t = computed(() => messages[_currentLocale.value])

  function setLocale(locale: Locale) {
    _currentLocale.value = locale
  }

  /** Simple interpolation: replaces {n} with the given value */
  function tf(template: string, values: Record<string, string | number>) {
    return Object.entries(values).reduce(
      (str, [key, val]) => str.replace(`{${key}}`, String(val)),
      template
    )
  }

  return {
    locale: _currentLocale,
    t,
    setLocale,
    tf,
  }
}
