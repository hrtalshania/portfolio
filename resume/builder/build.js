"use strict";

const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  TabStopType,
  BorderStyle,
  ExternalHyperlink,
} = require("docx");

// Variant support: `node build.js data.backend.json`
// Each data file can set "outputBase" to control the file name it writes.
const dataFile = process.argv[2] || "data.json";
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, dataFile), "utf8")
);

const FONT = "Calibri";
const ACCENT = "1F3B63";
const GREY = "595959";
const CONTENT_WIDTH = 10160; // A4 width (11906) minus 0.6" margins, in twips

function heading(text) {
  return new Paragraph({
    spacing: { before: 180, after: 60 },
    keepNext: true, // heading never stranded at the bottom of a page
    border: {
      bottom: { color: "BFBFBF", space: 1, style: BorderStyle.SINGLE, size: 6 },
    },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 21,
        color: ACCENT,
        characterSpacing: 24,
      }),
    ],
  });
}

function bullet(runs) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 30 },
    children: runs,
  });
}

function twoCol(leftRuns, rightText) {
  const children = [...leftRuns];
  if (rightText) {
    children.push(
      new TextRun({ text: "\t" + rightText, color: GREY, size: 19 })
    );
  }
  return new Paragraph({
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
    spacing: { after: 20 },
    keepNext: true, // keep the row with the content that follows it
    children,
  });
}

// Compact display text for URLs in the contact line
// (https://www.linkedin.com/in/x/ -> linkedin.com/in/x)
function compact(url) {
  return String(url).replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function hyperlink(text, url, opts = {}) {
  return new ExternalHyperlink({
    children: [
      new TextRun({ text, size: 18, color: "0563C1", ...opts }),
    ],
    link: url,
  });
}

function small(text, opts = {}) {
  return new TextRun({ text, size: 19, color: GREY, ...opts });
}

// ---------- Header ----------
// Every contact item that has a real URL becomes a clickable hyperlink.
const contactRuns = [];
function pushContact(run, url) {
  if (contactRuns.length) {
    contactRuns.push(new TextRun({ text: "  |  ", size: 18, color: "BFBFBF" }));
  }
  contactRuns.push(run);
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

const header = [
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
    spacing: { after: 20 },
    children: contactRuns,
  }),
];

const children = [...header];

// ---------- Summary ----------
if (data.objective) {
  children.push(heading("Summary"));
  children.push(
    new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: data.objective, size: 20 })],
    })
  );
}

// ---------- Education ----------
if (data.education && data.education.length) {
  children.push(heading("Education"));
  for (const e of data.education) {
    children.push(
      twoCol(
        [new TextRun({ text: e.degree, bold: true, size: 20 })],
        e.period
      )
    );
    const sub = [small(e.institute)];
    if (e.details) sub.push(small("  -  " + e.details));
    children.push(
      new Paragraph({ spacing: { after: 80 }, children: sub })
    );
  }
}

// ---------- Skills ----------
if (data.skills && data.skills.length) {
  children.push(heading("Technical Skills"));
  for (const s of data.skills) {
    children.push(
      new Paragraph({
        spacing: { after: 30 },
        children: [
          new TextRun({ text: s.category + ": ", bold: true, size: 20 }),
          new TextRun({ text: s.items.join(", "), size: 20 }),
        ],
      })
    );
  }
}

// ---------- Experience ----------
if (data.experience && data.experience.length) {
  children.push(heading("Experience"));
  for (const x of data.experience) {
    const lines = [{ text: x.role, bold: true, size: 20 }];
    if (x.company) lines[0].text += " - " + x.company;
    children.push(twoCol(lines, x.period));
    if (x.description) {
      children.push(
        bullet([new TextRun({ text: x.description, size: 20 })])
      );
    }
    if (x.subItems && x.subItems.length) {
      for (const s of x.subItems) {
        children.push(
          bullet([
            new TextRun({ text: s.name + ": ", bold: true, size: 20 }),
            new TextRun({ text: s.text, size: 20 }),
          ])
        );
      }
    }
  }
}

// ---------- Projects ----------
if (data.projects && data.projects.length) {
  children.push(heading("Projects"));
  for (const p of data.projects) {
    // The project title itself carries the link; no raw URL in the meta line.
    const titleRuns = p.link
      ? [hyperlink(p.title, p.link, { bold: true, size: 20 })]
      : [new TextRun({ text: p.title, bold: true, size: 20 })];
    children.push(twoCol(titleRuns, p.period));
    if (p.description) {
      children.push(
        new Paragraph({
          spacing: { after: 20 },
          keepLines: true,
          children: [new TextRun({ text: p.description, size: 20 })],
        })
      );
    }
    if (p.tech && p.tech.length) {
      children.push(
        new Paragraph({
          spacing: { after: 100 },
          keepLines: true,
          children: [
            new TextRun({ text: "Tech: ", bold: true, size: 19, color: GREY }),
            new TextRun({ text: p.tech.join(", "), size: 19, color: GREY }),
          ],
        })
      );
    }
  }
}

// ---------- Achievements ----------
if (data.achievements && data.achievements.length) {
  children.push(heading("Achievements"));
  for (const a of data.achievements) {
    children.push(bullet([new TextRun({ text: a, size: 20 })]));
  }
}

// ---------- Hobbies ----------
if (data.hobbies && data.hobbies.length) {
  children.push(heading("Hobbies"));
  children.push(
    new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: data.hobbies.join(", "), size: 20 })],
    })
  );
}

const doc = new Document({
  creator: data.name,
  title: data.name + " - Resume",
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
          margin: { top: 864, right: 864, bottom: 864, left: 864 },
        },
      },
      children,
    },
  ],
});

const outBase = data.outputBase || "Harshit_Talshania_Resume";
const outPath = path.join(__dirname, "..", outBase + ".docx");

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log("Wrote:", path.resolve(outPath));
});
