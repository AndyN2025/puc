function normalizePath(value: string) {
  return value.replace(/\\/g, '/').trim()
}

/**
 * Возвращает URL ассета программы по относительному пути внутри assets/documents/programs.
 * Пример: "ДПО/Программа ДПО Б 1.1.doc"
 */
export function getProgramDocByRelativePath(relativePath: string): string | undefined {
  const normalized = normalizePath(relativePath)
  if (!normalized) return undefined
  const encoded = encodeURI(normalized).replace(/%2F/g, '/')
  return `/documents/programs/${encoded}`
}
