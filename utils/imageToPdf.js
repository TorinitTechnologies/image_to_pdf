const PDFDocument = require("pdfkit");

const imageToPDF = (pages, size) => {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ margin: 0, size });
    let buffers = [];
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      return resolve(pdfData);
    });
    doc.on("data", buffers.push.bind(buffers));
	doc = addImagesOnPDFDoc(pages, doc,size);


    doc.end();
  });
};
 

const addImagesOnPDFDoc = (pages, doc,size) => {
  for (let index = 0; index < pages.length; index++) {
    doc.image(pages[index], 0, 0, {
      fit: size,
      align: "center",
      valign: "start",
    });

    if (pages.length != index + 1) doc.addPage();
  }
  return doc;
};

module.exports = imageToPDF;
module.exports.sizes = require("./sizes.json");
