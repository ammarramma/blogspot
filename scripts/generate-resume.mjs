import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'
import { profile } from '../src/data/profile.js'
import { projects } from '../src/data/projects.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const PAGE_W = 595.28
const PAGE_H = 841.89
const M = 34
const GAP = 22
const LEFT_W = 158
const RIGHT_X = M + LEFT_W + GAP
const RIGHT_W = PAGE_W - M - RIGHT_X
const CONTENT_BOTTOM = PAGE_H - M

const BODY = 8.4
const PROJECT_TITLE = 9.2
const PROJECT_GAP = 10
const PDF_PROJECTS = projects.slice(0, 4)
const pdfBullets = (project) => project.bullets.slice(0, 3)

/* Rosé Pine Dawn, tuned for print. */
const ink = '#191724'
const muted = '#575279'
const dim = '#797593'
const accent = '#286983'
const gold = '#b07d2b'
const line = '#dfdad9'

const doc = new PDFDocument({
  size: 'A4',
  margin: 0,
  info: {
    Title: `${profile.name} — Resume`,
    Author: profile.name,
    Subject: profile.role,
    Keywords:
      'resume, backend, web security, go, gin, laravel, react, cloudflare',
  },
})

doc.pipe(fs.createWriteStream(path.join(root, 'public', 'resume.pdf')))

/* ---------- primitives ---------- */

function rule(x, y, width, color = line, weight = 0.5) {
  doc
    .moveTo(x, y)
    .lineTo(x + width, y)
    .lineWidth(weight)
    .strokeColor(color)
    .stroke()
}

function sectionLabel(y, label, x = M, width = LEFT_W) {
  doc
    .font('Helvetica-Bold')
    .fontSize(7.2)
    .fillColor(accent)
    .text(label.toUpperCase(), x, y, { width, characterSpacing: 1.1 })

  const ruleY = y + 9
  rule(x, ruleY, width)
  return ruleY + 7
}

function entry(y, title, meta, x = M, width = LEFT_W) {
  doc
    .font('Helvetica-Bold')
    .fontSize(8.8)
    .fillColor(ink)
    .text(title, x, y, { width })
  y = doc.y + 1

  doc
    .font('Helvetica')
    .fontSize(7.6)
    .fillColor(muted)
    .text(meta, x, y, { width, lineGap: 1.1 })

  return doc.y
}

function paragraph(y, text, x, width) {
  doc
    .font('Helvetica')
    .fontSize(BODY)
    .fillColor(muted)
    .text(text, x, y, { width, lineGap: 1.4 })

  return doc.y
}

function bullets(y, items, x, width, size = BODY) {
  doc.font('Helvetica').fontSize(size)

  items.forEach((item) => {
    doc.fillColor(accent).text('•', x, y, { width: 7, lineBreak: false })
    doc
      .fillColor(muted)
      .text(item, x + 8, y, { width: width - 8, lineGap: 1.2 })
    y = doc.y + 1.8
  })

  return y
}

/* ---------- header ---------- */

function header() {
  doc
    .font('Helvetica-Bold')
    .fontSize(25)
    .fillColor(ink)
    .text(profile.name.toUpperCase(), M, M, { characterSpacing: 0.8 })

  doc
    .font('Helvetica')
    .fontSize(9.5)
    .fillColor(accent)
    .text(profile.role, M, 61)

  doc
    .fontSize(7.8)
    .fillColor(muted)
    .text(`${profile.headline} · ${profile.location}`, M, 75)

  const contact = [
    profile.resumeEmail,
    profile.githubLabel,
    profile.linkedinLabel,
    profile.location,
  ]

  doc.font('Courier').fontSize(7.2).fillColor(muted)
  contact.forEach((item, index) => {
    doc.text(item, PAGE_W - M - 190, M + index * 10, {
      width: 190,
      align: 'right',
    })
  })

  rule(M, 94, PAGE_W - M * 2, ink, 0.8)
  return 104
}

/* ---------- page 1 ---------- */

const contentTop = header()

let leftY = contentTop

leftY = sectionLabel(leftY, 'Education')
leftY = entry(
  leftY,
  'Politeknik Negeri Lhokseumawe',
  'D-IV Teknik Informatika\n2024 – present',
)
leftY += 6
leftY = entry(
  leftY,
  'SMK Negeri 2 Lhokseumawe',
  'Visual Communication Design\n2020 – 2021, 2022 – 2024',
)
leftY += 10

leftY = sectionLabel(leftY, 'Certification')
leftY = entry(leftY, 'VSGA — Web Developer', 'Vocational certification · 2025')
leftY += 10

leftY = sectionLabel(leftY, 'Skills')

profile.skills.forEach((group) => {
  doc
    .font('Helvetica-Bold')
    .fontSize(7.4)
    .fillColor(ink)
    .text(group.group, M, leftY, { width: LEFT_W })
  leftY = doc.y + 1

  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(muted)
    .text(group.items.join(', '), M, leftY, {
      width: LEFT_W,
      lineGap: 1.2,
    })
  leftY = doc.y + 6
})

/* ---------- right column ---------- */

let rightY = sectionLabel(contentTop, 'Profile', RIGHT_X, RIGHT_W)

profile.about.forEach((text, index) => {
  rightY = paragraph(rightY, text, RIGHT_X, RIGHT_W)
  if (index < profile.about.length - 1) rightY += 3
})

rightY += 8
rightY = sectionLabel(rightY, 'Projects', RIGHT_X, RIGHT_W)

function projectLinks(project) {
  return [project.liveUrl, project.repo]
    .filter(Boolean)
    .map((url) => url.replace(/^https?:\/\//, '').replace(/\/$/, ''))
    .join('  ·  ')
}

function drawProject(project, x, width, y) {
  doc
    .font('Helvetica-Bold')
    .fontSize(PROJECT_TITLE)
    .fillColor(ink)
    .text(project.title, x, y, { width: width - 100 })

  const afterTitle = doc.y

  const status = [
    project.version,
    project.status === 'development' ? 'in development' : 'released',
  ]
    .filter(Boolean)
    .join(' · ')

  doc
    .font('Courier')
    .fontSize(6.8)
    .fillColor(project.status === 'development' ? gold : accent)
    .text(status, x, y, { width, align: 'right' })

  y = Math.max(afterTitle, y + PROJECT_TITLE) + 1

  doc
    .font('Helvetica')
    .fontSize(7.4)
    .fillColor(muted)
    .text(
      `${project.category} · ${project.type} · ${project.stack.join(', ')}`,
      x,
      y,
      { width, lineGap: 0.8 },
    )
  y = doc.y + 2.5

  y = bullets(y, pdfBullets(project), x, width)

  doc
    .font('Courier')
    .fontSize(6.6)
    .fillColor(dim)
    .text(projectLinks(project), x + 8, y, {
      width: width - 8,
      lineGap: 0.8,
    })

  return doc.y + PROJECT_GAP
}

PDF_PROJECTS.forEach((project) => {
  rightY = drawProject(project, RIGHT_X, RIGHT_W, rightY)
})

rightY += 2
rightY = sectionLabel(rightY, 'Experience', RIGHT_X, RIGHT_W)

const work = profile.career.find((item) => item.type === 'work')
rightY = entry(rightY, work.title, work.meta, RIGHT_X, RIGHT_W)
rightY += 3
rightY = bullets(rightY, work.bullets, RIGHT_X, RIGHT_W)

/* ---------- finalize ---------- */

const contentBottom = Math.max(leftY, rightY)

if (contentBottom > CONTENT_BOTTOM) {
  throw new Error(
    `Resume content overflows page 1 by ${(contentBottom - CONTENT_BOTTOM).toFixed(1)}pt`,
  )
}

doc.end()

console.log(
  `Wrote public/resume.pdf (1 page, ${PDF_PROJECTS.length} projects, content ends at ${contentBottom.toFixed(1)}pt)`,
)
