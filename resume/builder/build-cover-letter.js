"use strict";

// Generates the cover letter as docx + PDF + plain text from cover-letter.json.
// Contact details come from data.json so the letter always matches the resume.
// Run: cd resume/builder && node build-cover-letter.js

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ExternalHyperlink,
} = require("docx");

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data.json"), "utf8")
);
// Usage: node build-cover-letter.js [cover-letter.json]
// The letter file can set "outputBase" to control the output file name.
const letterFile = process.argv[2] || "cover-letter.json";
const letter = JSON.parse(
  fs.readFileSync(path.join(__dirname, letterFile), "utf8")
);

const outBase = path.join(
  __dirname,
  "..",
  letter.outputBase || "Harshit_Talshania_Cover_Letter"
);

const FONT = "Calibri";
const ACCENT = "1F3B63";
const GREY = "595959";
const LINK = "0563C1";

const compact = (u) => String(u || "").replace(/^https?:\/\//, "").replace(/\/$/, "");

// ---------- Tokens ----------
// {company} {role} {source} {date} are replaced everywhere in the letter text.
const dateStr =
  letter.date === "auto"
    ? new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : letter.date;

const fill = (s) =>
  String(s || "")
    .replace(/\{company\}/g, letter.recipient.company)
    .replace(/\{role\}/g, letter.role)
    .replace(/\{source\}/g, letter.source || "")
    .replace(/\{date\}/g, dateStr);

const greeting =
  letter.recipient.name && letter.recipient.name !== "Hiring Manager"
    ? "Dear " + letter.recipient.name + ","
    : "Dear " + letter.recipient.company + " Hiring Team,";

if (/placeholder/i.test(letter.whyThem)) {
  console.warn(
    "NOTE: whyThem still contains the placeholder. Fill it in cover-letter.json before sending."
  );
}

// ---------- Shared contact header (identical to the resume) ----------
const contactRuns = [];
function pushContact(run, url) {
  if (contactRuns.length) {
    contactRuns.push(new TextRun({ text: "  |  ", size: 18, color: "BFBFBF" }));
  }
  contactRuns.push(run);
}
function hyperlink(text, url, opts = {}) {
  return new ExternalHyperlink({
    children: [new TextRun({ text, size: 18, color: LINK, ...opts })],
    link: url,
  });
}
if (data.contact.location) {
  pushContact(new TextRun({ text: data.contact.location, size: 18, color: GREY }));
}
if (data.contact.phone) {
  pushContact(new TextRun({ text: data.contact.phone, size: 18, color: GREY }));
}
if (data.contact.email) {
  pushContact(hyperlink(data.contact.email, "mailto:" + data.contact.email));
}
if (data.contact.linkedin) {
  pushContact(hyperlink(compact(data.contact.linkedin), data.contact.linkedin));
}
if (data.contact.github) {
  pushContact(hyperlink(compact(data.contact.github), data.contact.github));
}
if (data.contact.portfolio) {
  pushContact(hyperlink(compact(data.contact.portfolio), data.contact.portfolio));
}

// ---------- docx ----------
const body = [];

body.push(
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: data.name.toUpperCase(),
        bold: true,
        size: 40,
        color: ACCENT,
        characterSpacing: 20,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: contactRuns,
  })
);

// Date
body.push(
  new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: dateStr, size: 20 })] })
);

// Recipient block
const recipientLines = [
  letter.recipient.name,
  letter.recipient.title,
  letter.recipient.company,
].filter(Boolean);
recipientLines.forEach((line, i) => {
  body.push(
    new Paragraph({
      spacing: { after: i === recipientLines.length - 1 ? 240 : 20 },
      children: [new TextRun({ text: fill(line), size: 20 })],
    })
  );
});

// Greeting
body.push(
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: greeting, size: 20 })] })
);

// Letter paragraphs: opening, body, whyThem, closing
const paragraphs = [letter.opening, ...letter.body, letter.whyThem, letter.closing];
for (const p of paragraphs) {
  body.push(
    new Paragraph({
      spacing: { after: 200 },
      keepLines: true,
      children: [new TextRun({ text: fill(p), size: 20 })],
    })
  );
}

// Sign-off
body.push(
  new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "Sincerely,", size: 20 })] }),
  new Paragraph({
    spacing: { before: 120 },
    children: [new TextRun({ text: data.name, bold: true, size: 20 })],
  })
);

const doc = new Document({
  creator: data.name,
  title: data.name + " - Cover Letter",
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 20 },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      children: body,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outBase + ".docx", buf);
  console.log("Wrote:", path.resolve(outBase + ".docx"));
});

// ---------- PDF (print-styled A4 HTML via headless Edge/Chrome) ----------
const esc = (s) =>
  String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const contactHtml = [
  data.contact.location,
  data.contact.phone,
  data.contact.email
    ? `<a href="mailto:${esc(data.contact.email)}">${esc(data.contact.email)}</a>`
    : "",
  data.contact.linkedin
    ? `<a href="${esc(data.contact.linkedin)}">${esc(compact(data.contact.linkedin))}</a>`
    : "",
  data.contact.github
    ? `<a href="${esc(data.contact.github)}">${esc(compact(data.contact.github))}</a>`
    : "",
  data.contact.portfolio
    ? `<a href="${esc(data.contact.portfolio)}">${esc(compact(data.contact.portfolio))}</a>`
    : "",
]
  .filter(Boolean)
  .map((s) => `<span>${s}</span>`)
  .join("");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${esc(data.name)} - Cover Letter</title>
<style>
  @page { size: A4; margin: 19mm 19mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: Calibri, "Segoe UI", Arial, sans-serif;
    font-size: 10.5pt; color: #1a1a1a; line-height: 1.45;
  }
  h1 {
    text-align: center; color: #1F3B63; font-size: 20pt;
    letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4pt;
  }
  .contact { text-align: center; color: #595959; font-size: 9pt; margin-bottom: 26pt; }
  .contact span + span::before { content: "  |  "; color: #b0b0b0; }
  .date { margin-bottom: 12pt; }
  .rcpt { margin-bottom: 2pt; }
  .rcpt-last { margin-bottom: 22pt; }
  .greet { margin-bottom: 14pt; }
  p.body { margin-bottom: 13pt; }
  .sign { margin-bottom: 3pt; }
  .signame { font-weight: bold; }
  a { color: #0563C1; text-decoration: none; }
</style>
</head>
<body>
  <h1>${esc(data.name)}</h1>
  <p class="contact">${contactHtml}</p>

  <p class="date">${esc(dateStr)}</p>

  ${recipientLines
    .map(
      (line, i) =>
        `<p class="rcpt${i === recipientLines.length - 1 ? " rcpt-last" : ""}">${esc(fill(line))}</p>`
    )
    .join("")}

  <p class="greet">${esc(greeting)}</p>

  ${paragraphs.map((p) => `<p class="body">${esc(fill(p))}</p>`).join("")}

  <p class="sign">Sincerely,</p>
  <p class="signame">${esc(data.name)}</p>
</body>
</html>`;

const htmlPath = path.join(__dirname, "cover-letter.html");
fs.writeFileSync(htmlPath, html);
console.log("Wrote:", htmlPath);

const browsers = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];
const browser = browsers.find((p) => fs.existsSync(p));
if (!browser) {
  console.error("No Edge/Chrome found for PDF printing.");
  process.exit(1);
}

execFileSync(browser, [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${outBase}.pdf`,
  "file:///" + htmlPath.replace(/\\/g, "/"),
], { stdio: "ignore", timeout: 90000 });
console.log("Wrote:", path.resolve(outBase + ".pdf"));

// ---------- Plain text (for application portals with a paste box) ----------
const textParts = [
  data.name.toUpperCase(),
  [
    data.contact.location,
    data.contact.phone,
    data.contact.email,
    compact(data.contact.linkedin),
    compact(data.contact.github),
    compact(data.contact.portfolio),
  ]
    .filter(Boolean)
    .join(" | "),
  "",
  dateStr,
  "",
  ...recipientLines.map((l) => fill(l)),
  "",
  greeting,
  "",
  ...paragraphs.flatMap((p) => [fill(p), ""]),
  "Sincerely,",
  data.name,
  "",
];

fs.writeFileSync(outBase + ".txt", textParts.join("\n"));
console.log("Wrote:", path.resolve(outBase + ".txt"));
