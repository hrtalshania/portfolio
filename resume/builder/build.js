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

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data.json"), "utf8")
);

const FONT = "Calibri";
const ACCENT = "1F3B63";
const GREY = "595959";
const CONTENT_WIDTH = 10160; // A4 width (11906) minus 0.6" margins, in twips

function heading(text) {
  return new Paragraph({
    spacing: { before: 180, after: 60 },
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
    children,
  });
}

function small(text, opts = {}) {
  return new TextRun({ text, size: 19, color: GREY, ...opts });
}

// ---------- Header ----------
const contactParts = [];
if (data.contact.location) contactParts.push(data.contact.location);
if (data.contact.phone) contactParts.push(data.contact.phone);
if (data.contact.email) contactParts.push(data.contact.email);
contactParts.push(data.contact.linkedin || "[LinkedIn]");
contactParts.push(data.contact.github || "[GitHub]");
if (data.contact.portfolio) contactParts.push(data.contact.portfolio);

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
    children: [
      new TextRun({ text: contactParts.join("  |  "), size: 18, color: GREY }),
    ],
  }),
];

const children = [...header];

// ---------- Objective ----------
if (data.objective) {
  children.push(heading("Objective"));
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
  }
}

// ---------- Projects ----------
if (data.projects && data.projects.length) {
  children.push(heading("Projects"));
  for (const p of data.projects) {
    children.push(
      twoCol([new TextRun({ text: p.title, bold: true, size: 20 })], p.period)
    );
    if (p.description) {
      children.push(
        new Paragraph({
          spacing: { after: 20 },
          children: [new TextRun({ text: p.description, size: 20 })],
        })
      );
    }
    const meta = [];
    if (p.tech && p.tech.length) {
      meta.push(new TextRun({ text: "Tech: ", bold: true, size: 19, color: GREY }));
      meta.push(new TextRun({ text: p.tech.join(", "), size: 19, color: GREY }));
    }
    if (p.link) {
      meta.push(small("  |  "));
      meta.push(
        new ExternalHyperlink({
          children: [
            new TextRun({
              text: p.link,
              size: 19,
              color: "0563C1",
              underline: {},
            }),
          ],
          link: p.link,
        })
      );
    }
    if (meta.length) {
      children.push(new Paragraph({ spacing: { after: 100 }, children: meta }));
    } else {
      children.push(new Paragraph({ spacing: { after: 100 }, children: [] }));
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

// ---------- Languages ----------
if (data.languages) {
  children.push(heading("Languages"));
  children.push(
    new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: data.languages, size: 20 })],
    })
  );
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

const outPath = path.join(
  __dirname,
  "..",
  "Harshit_Talshania_Resume.docx"
);

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outPath, buf);
  console.log("Wrote:", path.resolve(outPath));
});
