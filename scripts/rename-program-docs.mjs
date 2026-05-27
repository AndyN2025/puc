/**
 * Переименование программ в короткие ASCII-пути (лимит имён файлов на Linux / GitHub Actions).
 * Запуск: node scripts/rename-program-docs.mjs
 */
import { cpSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const programsRoot = join(root, 'assets/documents/programs')

function ensureDir(p) {
  mkdirSync(p, { recursive: true })
}

function moveFile(from, to) {
  ensureDir(dirname(to))
  if (existsSync(to)) rmSync(to)
  renameSync(from, to)
}

function copyFile(from, to) {
  ensureDir(dirname(to))
  cpSync(from, to, { force: true })
}

/** @param {string} dir */
function listFiles(dir) {
  const out = []
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      for (const f of listFiles(full)) out.push(f)
    } else {
      out.push(full)
    }
  }
  return out
}

// --- Предаттестационная: файлы по коду программы ---
const paSrc = join(programsRoot, 'Предаттестационная подготовка')
const paLegacy = join(programsRoot, 'ДОП  Предаттестационная')
const paDest = join(programsRoot, 'pa')

ensureDir(paDest)

if (existsSync(paSrc)) {
  for (const name of readdirSync(paSrc)) {
    const fixed = name.replace(/\.{2,}(?=\.doc)/i, '.')
    moveFile(join(paSrc, name), join(paDest, fixed))
  }
  rmSync(paSrc, { recursive: true, force: true })
}

if (existsSync(paLegacy)) {
  const legacyMap = {
    'А.1 Предаттестационная.doc': 'А.1.doc',
    'Б.1.1 Предаттестационная.doc': 'Б.1.1.doc',
    'Б.1.2 Предаттестационная.doc': 'Б.1.2.doc',
    'Б.1.7 Предаттестационная.doc': 'Б.1.7.doc',
    'Б.7.1.doc Программа.doc': 'Б.7.1.doc',
    'Б.7.4.doc Программа.doc': 'Б.7.4.doc',
    'Б 8.1 Предаттестационная .doc': 'Б.8.1.doc',
    'Б 8.1.2 Предаттестационная.doc': 'Б.8.1.2.doc',
    'Б 8.2 Предаттестационная.doc': 'Б.8.2.doc',
    'Б 8.3 Предаттестационная.doc': 'Б.8.3.doc',
    'Б 9.3 предаттестационная .doc': 'Б.9.3.doc',
    'Б 9.5 предаттестационная .doc': 'Б.9.5.doc',
    'Б.11.1 Предаттестационная.doc': 'Б.11.1.doc'
  }
  for (const [oldName, newName] of Object.entries(legacyMap)) {
    const from = join(paLegacy, oldName)
    const to = join(paDest, newName)
    if (existsSync(from) && !existsSync(to)) copyFile(from, to)
  }
  rmSync(paLegacy, { recursive: true, force: true })
}

// --- ДПО ---
const dpoMap = {
  'Программа ДПО А1 Основы промышленной безопасности.doc': 'А.1.doc',
  'Программа ДПО Б 1.1.doc': 'Б.1.1.doc',
  'Программа ДПО Б 1.2.doc': 'Б.1.2.doc',
  'Программа ДПО Б 1.6.doc': 'Б.1.6.doc',
  'Программа ДПО Б 1.8.doc': 'Б.1.8.doc',
  'Программа ДПО Б 1.9.doc': 'Б.1.9.doc',
  'Программа ДПО Б 1.10.doc': 'Б.1.10.doc',
  'Программа ДПО Б 1.11.doc': 'Б.1.11.doc',
  'Программа ДПО Б 1.12.doc': 'Б.1.12.doc',
  'Программа ДПО Б 1.13.doc': 'Б.1.13.doc',
  'Программа ДПО Б 2.1.doc': 'Б.2.1.doc',
  'Программа ДПО Б 2.7.doc': 'Б.2.7.doc',
  'Программа ДПО Б 2.8.doc': 'Б.2.8.doc',
  'Программа ДПО Б 2.10.doc': 'Б.2.10.doc',
  'Программа ДПО Б 10.1.doc': 'Б.10.1.doc',
  'Программа ДПО Б 10.2.doc': 'Б.10.2.doc',
  'Программа ДПО Б 11.1.doc': 'Б.11.1.doc',
  'Программа повышения квалификации Б7.1.doc': 'Б.7.1.doc',
  'Программа повышения квалификации Б7.3.doc': 'Б.7.3.doc',
  'Программа повышения квалификации Б7.5  .doc': 'Б.7.5.doc',
  'Программа повышения квалификации Б8.1.doc': 'Б.8.1.doc',
  'Программа повышения квалификации Б8.2.doc': 'Б.8.2.doc',
  'Программа повышения квалификации Б8.3.doc': 'Б.8.3.doc',
  'Программа повышения квалификации Б8.6.doc': 'Б.8.6.doc'
}
migrateFolder('ДПО', 'dpo', dpoMap)

// --- ОПО (ДОП Персонал) ---
const opoMap = {
  'Рабочий люльки, находящийся на подъемнике (вышке).doc': 'opo_01.doc',
  'Подготовка персонала, имеющего профессию  Стропальщик.doc': 'opo_02.doc',
  '«Управление подъемными сооружениями с пола».doc': 'opo_05.doc',
  '«Управление подъемными сооружениями с использованием системы дистанционного управления по радиоканалу или иной линии связи».doc':
    'opo_06.doc',
  'Подготовка персонала, имеющего профессию  машинист крана  автомобильного .doc': 'opo_07.doc',
  'Подготовка персонала, имеющего профессию  машинист крана (крановщик).doc': 'opo_08.doc',
  'Персонал взрывопожароопасных химических, нефтехимических производств .doc': 'opo_09.doc',
  'Программа развивающая  Кислоты и щелочи.doc': 'opo_10.doc',
  '«Персонал химически опасных производственных объектов, на которых используются и хранятся токсичные и высокотоксичные вещества»   .doc':
    'opo_11.doc',
  '«Персонал химически опасных производственных объектов».doc': 'opo_12.doc',
  '«Персонал, эксплуатирующий взрывопожароопасные производственные».doc': 'opo_13.doc',
  'Персонал, эксплуатирующий  баллоны со сжатыми, сжиженными и растворенными под давлением газами  .doc':
    'opo_14.doc',
  'Подготовка персонала, имеющего профессию  сливщик-разливщик.doc': 'opo_15.doc',
  'персонал обслуживающий трубопроводы пара и горячей воды  ДОП.doc': 'opo_17.doc',
  '«Персонал, обслуживающий сосуды, работающие под избыточным».doc': 'opo_19.doc',
  '«Подготовка персонала, имеющего профессию «Оператор котельной».doc': 'opo_20.doc',
  'Персонал, обслуживающий сосуды (газификаторы, баллоны), работающие под избыточным давлением, для хранения медицинского кислорода.doc':
    'opo_21.doc',
  '«Персонал, обслуживающий газовое оборудование промышленных печей».doc': 'opo_22.doc'
}
migrateFolder('ДОП Персонал', 'opo', opoMap)
copyFile(join(programsRoot, 'opo/opo_15.doc'), join(programsRoot, 'opo/opo_16.doc'))

// --- ПО (профобучение, пока без привязки на сайте) ---
const poMap = {
  'Стропальщик 152 часа.doc': 'prof_01.doc',
  'Программа водитель электро- и автотележки.doc': 'prof_02.doc',
  'Программа водитель погрузчика .doc': 'prof_03.doc',
  'Программа варщик 11365.doc': 'prof_04.doc',
  'Сливщик разливщик 2р.doc': 'prof_07.doc',
  'Программа сливщик разливщик 3 разряд.doc': 'prof_08.doc',
  'Программа оператор котельной  новая форма 18.0723.doc': 'prof_09.doc',
  'Аппаратчик химводоочистки 2 разряд.doc': 'prof_10.doc',
  'Программа обучения  машиниста 5 раз исправленная.doc': 'prof_15.doc',
  'Программа обучения  накатчик.doc': 'prof_16.doc',
  'Программа обучения  прессовщика.doc': 'prof_17.doc',
  'Программа обучения  размольщика  УРМ.doc': 'prof_18.doc',
  'Программа обучения  размольщик 4 раз.doc': 'prof_19.doc',
  'Программа обучения  резчика 2 разряда.doc': 'prof_20.doc',
  'Программа обучения  резчика.doc': 'prof_21.doc',
  'Программа обучения  сушильщика 4 раз.doc': 'prof_23.doc',
  'Машинист подъемника с РП.doc': 'prof_29.doc'
}
migrateFolder('ПО', 'po', poMap)

// --- Охрана труда ---
const otMap = {
  '46А.doc': 'ot_46a.doc',
  '46Б.doc': 'ot_46b.doc',
  'Высота 1.docx': 'ot_vis_1.docx',
  'Высота 2.docx': 'ot_vis_2.docx',
  'Высота 3.doc': 'ot_vis_3.doc',
  'Высота бг.doc': 'ot_vis_bg.doc',
  'ОЗП 1.docx': 'ot_ozp_1.docx',
  'ОЗП 2.docx': 'ot_ozp_2.docx',
  'ОЗП 3.docx': 'ot_ozp_3.docx',
  'ОПП.doc': 'ot_opp.doc',
  'Погр-разгр.doc': 'ot_pogr.doc',
  'СИЗ.docx': 'ot_siz.docx',
  'Программа Переподготовка Специалист по охране труда.docx': 'ot_spec.docx'
}
migrateFolder('Охрана труда', 'ot', otMap)

// --- Пожарная безопасность ---
const fireMap = {
  'Пож. без. Программа №1.docx': 'fire_01.docx',
  'Пож. без. Программа №3.docx': 'fire_03.docx',
  'Пож. без. Программа №4.docx': 'fire_04.docx',
  'Пож. без. Программа №5 переподготовка.docx': 'fire_05.docx'
}
migrateFolder('Пожарная безопасность', 'fire', fireMap)

// --- Прекурсоры ---
const narMap = {
  'Организация деятельности по обороту наркотических средств, психотропных веществ и их прекурсоров.doc':
    'nar_01.doc',
  'nar_02_gos_regulirovanie_med_farm.doc': 'nar_02.doc'
}
migrateFolder('Прекурсоры', 'nar', narMap)

// --- ТЭУ ---
const teuMap = {
  'Предэкзаменационная подготовка работников  организаций потребителей тепловой энергии (обслуживающих организаций).doc':
    'teu_01.doc',
  'Предэкзаменационная подготовка работников теплоснабжающих.doc': 'teu_02.doc'
}
migrateFolder('ТЭУ', 'teu', teuMap)

// --- Экология ---
const ecoMap = {
  '«Обеспечение экологической безопасности при работах в области обращения с отходами I-IV классов опасности».docx':
    'eco_01.docx',
  '«Обеспечение экологической безопасности руководителями и специалистами».docx': 'eco_02.docx',
  'Переподготовка  «Специалист по экологической безопасности»  .docx': 'eco_04.docx'
}
migrateFolder('Экология', 'eco', ecoMap)

function migrateFolder(oldFolder, newFolder, nameMap) {
  const src = join(programsRoot, oldFolder)
  const dest = join(programsRoot, newFolder)
  if (!existsSync(src)) return
  ensureDir(dest)
  for (const name of readdirSync(src)) {
    const target = nameMap[name] ?? sanitizeName(name)
    moveFile(join(src, name), join(dest, target))
  }
  rmSync(src, { recursive: true, force: true })
}

function sanitizeName(name) {
  return name
    .replace(/[«»""]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 80)
}

// Проверка длины имён
let tooLong = 0
for (const f of listFiles(programsRoot)) {
  const base = f.split('/').pop()
  if (Buffer.byteLength(base, 'utf8') > 200) {
    console.warn('Длинное имя:', base)
    tooLong++
  }
}
console.log('[rename-program-docs] Готово. Папки: pa, dpo, opo, po, ot, fire, nar, teu, eco')
console.log('[rename-program-docs] Файлов pa:', existsSync(paDest) ? readdirSync(paDest).length : 0)
if (tooLong) console.warn('[rename-program-docs] Внимание: остались длинные имена:', tooLong)
