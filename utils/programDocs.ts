function normalizePath(value: string) {
  return value.replace(/\\/g, '/').trim()
}

/**
 * Возвращает URL ассета программы по относительному пути внутри assets/documents/programs.
 * Пример: "dpo/Б.1.1.doc"
 */
export function getProgramDocByRelativePath(relativePath: string): string | undefined {
  const normalized = normalizePath(relativePath)
  if (!normalized) return undefined
  const encoded = encodeURI(normalized).replace(/%2F/g, '/')
  return `/documents/programs/${encoded}`
}

/** Программа по коду курса в папке (pa, dpo и т.д.): «Б.1.1» → «pa/Б.1.1.doc» */
export function getProgramDocByTextCode(
  folder: string,
  textCode: string | undefined,
  ext = 'doc'
): string | undefined {
  if (!textCode || textCode === '—' || textCode === '-') return undefined
  return getProgramDocByRelativePath(`${folder}/${textCode}.${ext}`)
}
