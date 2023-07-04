const PDFDocument = require("pdfkit");

module.exports = (pages, size) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 0, size });
    let buffers = [];
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      return resolve(pdfData);
    });
    doc.on("data", buffers.push.bind(buffers));
    for (let index = 0; index < pages.length; index++) {
      doc.image(pages[index], 0, 0, {
        fit: size,
        align: "center",
        valign: "start",
      });

      if (pages.length != index + 1) doc.addPage();
    }

    doc.end();

    return doc;
  });
};

module.exports.sizes = require("./sizes.json");
