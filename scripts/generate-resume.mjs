import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import PDFDocument from 'pdfkit'
import { profile } from '../src/data/profile.js'
import { projects } from '../src/data/projects.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const PAGE_W = 595.28
const PAGE_H = 841.89
const M = 42
const GAP = 24
const LEFT_W = 168
const RIGHT_X = M + LEFT_W + GAP
const RIGHT_W = PAGE_W - M - RIGHT_X

const ink = '#171a17'
const muted = '#56605a'
const dim = '#8b938d'
const accent = '#2f7d4f'
const amber = '#9a6b12'
const line = '#d8ddd9'

const doc = new PDFDocument({
  size: 'A4',
  margin: 0,
  info: {
    Title: 'Ammar — Resume',
    Author: 'Ammar',
    Subject: 'Backend & Web Developer',
    Keywords: 'resume, backend, web developer, laravel, supabase, go',
  },
})

doc.pipe(fs.createWriteStream(path.join(root, 'public', 'resume.pdf')))

/* ---------- header ---------- */

const avatarSize = 58
doc.save()
doc
  .circle(M + avatarSize / 2, 38 + avatarSize / 2, avatarSize / 2)
  .clip()
doc.image(path.join(root, 'public', 'avatar-print.jpg'), M, 38, {
  width: avatarSize,
  height: avatarSize,
})
doc.restore()

const textX = M + avatarSize + 18

doc
  .font('Helvetica-Bold')
  .fontSize(27)
  .fillColor(ink)
  .text(profile.name.toUpperCase(), textX, 37, { characterSpacing: 1 })

doc
  .font('Helvetica')
  .fontSize(10)
  .fillColor(accent)
  .text(profile.role, textX, 70)

doc
  .fontSize(8.3)
  .fillColor(muted)
  .text(`${profile.headline} · ${profile.location}`, textX, 85)

const contact = [
  profile.email,
  profile.githubLabel,
  profile.linkedinLabel,
  profile.location,
]

doc.font('Courier').fontSize(7.6).fillColor(muted)
contact.forEach((item, index) => {
  doc.text(item, PAGE_W - M - 190, 39 + index * 12, {
    width: 190,
    align: 'right',
  })
})

doc
  .moveTo(M, 112)
  .lineTo(PAGE_W - M, 112)
  .lineWidth(0.8)
  .strokeColor(ink)
  .stroke()

/* ---------- helpers ---------- */

function sectionLabel(y, label, x = M, width = LEFT_W) {
  doc
    .font('Courier-Bold')
    .fontSize(7.6)
    .fillColor(accent)
    .text(label.toUpperCase(), x, y, {
      width,
      characterSpacing: 1.3,
    })

  const ruleY = y + 11
  doc
    .moveTo(x, ruleY)
    .lineTo(x + width, ruleY)
    .lineWidth(0.5)
    .strokeColor(line)
    .stroke()

  return ruleY + 8
}

function entry(y, title, meta, x = M, width = LEFT_W) {
  doc
    .font('Helvetica-Bold')
    .fontSize(9.4)
    .fillColor(ink)
    .text(title, x, y, { width })
  y = doc.y + 1.5

  doc
    .font('Helvetica')
    .fontSize(8.2)
    .fillColor(muted)
    .text(meta, x, y, { width, lineGap: 1.6 })

  return doc.y
}

function paragraph(y, text, x = RIGHT_X, width = RIGHT_W, size = 9.2) {
  doc
    .font('Helvetica')
    .fontSize(size)
    .fillColor(muted)
    .text(text, x, y, { width, lineGap: 2.4 })

  return doc.y
}

function bullets(y, items, x = RIGHT_X, width = RIGHT_W) {
  doc.font('Helvetica').fontSize(9)

  items.forEach((item) => {
    doc.fillColor(accent).text('•', x, y, { width: 8 })
    doc
      .fillColor(muted)
      .text(item, x + 9, y, { width: width - 9, lineGap: 2 })
    y = doc.y + 3
  })

  return y
}

/* ---------- left column ---------- */

let leftY = 130

leftY = sectionLabel(leftY, 'Education')
leftY = entry(
  leftY,
  'Politeknik Negeri Lhokseumawe',
  'D-IV Teknik Informatika\n2024 – present',
)
leftY += 10
leftY = entry(
  leftY,
  'SMK Negeri 2 Lhokseumawe',
  'Visual Communication Design\n2020 – 2021, 2022 – 2024',
)
leftY += 18

leftY = sectionLabel(leftY, 'Certification')
leftY = entry(leftY, 'VSGA — Web Developer', 'Vocational certification · 2025')
leftY += 18

leftY = sectionLabel(leftY, 'Skills')

profile.skills.forEach((group) => {
  doc
    .font('Helvetica-Bold')
    .fontSize(7.8)
    .fillColor(ink)
    .text(group.group, M, leftY, { width: LEFT_W })
  leftY = doc.y + 1.5

  doc
    .font('Helvetica')
    .fontSize(8.4)
    .fillColor(muted)
    .text(group.items.join(', '), M, leftY, {
      width: LEFT_W,
      lineGap: 1.8,
    })
  leftY = doc.y + 9
})

/* ---------- right column ---------- */

let rightY = 130

rightY = sectionLabel(rightY, 'Profile', RIGHT_X, RIGHT_W)
rightY = paragraph(rightY, profile.about.join(' '))
rightY += 18

rightY = sectionLabel(rightY, 'Projects', RIGHT_X, RIGHT_W)

projects.forEach((project) => {
  const titleY = rightY

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .fillColor(ink)
    .text(project.title, RIGHT_X, titleY, { width: RIGHT_W - 110 })

  const afterTitle = doc.y

  doc
    .font('Courier')
    .fontSize(7.6)
    .fillColor(project.status === 'development' ? amber : accent)
    .text(
      [project.version, project.status === 'development' ? 'in development' : null]
        .filter(Boolean)
        .join(' · '),
      RIGHT_X,
      titleY,
      { width: RIGHT_W, align: 'right' },
    )

  rightY = Math.max(afterTitle, doc.y) + 2

  doc
    .font('Helvetica')
    .fontSize(8.2)
    .fillColor(muted)
    .text(`${project.type} · ${project.stack.join(', ')}`, RIGHT_X, rightY, {
      width: RIGHT_W,
    })
  rightY = doc.y + 4

  rightY = bullets(rightY, project.bullets)

  doc
    .font('Courier')
    .fontSize(7.4)
    .fillColor(dim)
    .text(project.repo.replace('https://', ''), RIGHT_X + 9, rightY, {
      width: RIGHT_W - 9,
    })
  rightY = doc.y + 16
})

rightY += 2
rightY = sectionLabel(rightY, 'Experience', RIGHT_X, RIGHT_W)

const work = profile.career.find((item) => item.type === 'work')
rightY = entry(rightY, work.title, work.meta, RIGHT_X, RIGHT_W)
rightY += 4
rightY = bullets(rightY, work.bullets)

/* ---------- footer ---------- */

const footerY = PAGE_H - 44

doc
  .moveTo(M, footerY)
  .lineTo(PAGE_W - M, footerY)
  .lineWidth(0.5)
  .strokeColor(line)
  .stroke()

doc
  .font('Courier')
  .fontSize(7)
  .fillColor(dim)
  .text(
    `${profile.email}   ·   ${profile.githubLabel}   ·   ${profile.linkedinLabel}`,
    M,
    footerY + 8,
    { width: PAGE_W - M * 2, align: 'center' },
  )

doc.end()

console.log('Wrote public/resume.pdf')
