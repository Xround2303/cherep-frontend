const requireLang = import.meta.glob('../lang/*/*.json', { eager: true })

type TMessages = { [k: string]: TMessages }
type TRequireLangFile = Record<string, { default: Record<string, TMessages>}>

const messages: TMessages = {}

for (const file of Object.keys(requireLang)) {
  const path = file.replace(/(\.\/|\.json$)/g, '').split('/')

  path.reduce((section: TMessages, key: string, i: number): TMessages => {
    if (key in section) {
      return section[key]
    }

    if (i + 1 === path.length) {
      section[key] = (requireLang[file] as TRequireLangFile).default
    } else {
      section[key] = {} as TMessages
    }
    
    return section[key]
  }, messages)
}

export type { TMessages }
export default messages
