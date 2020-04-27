const { docModel } = require('./models/index');

function getFolderData(req, res) {
  let filterObj;
  if (req.body.docId) filterObj = { _id: req.body.docId };
  else filterObj = { isRoot: true };
  docModel.findOne(filterObj)
    .populate('children', 'name').populate('heirarchy', 'name').then((doc) => {
      res.send(doc);
    });
}

function addFolder(req, res) {
  docModel.findById(req.body.docId)
    .populate('children', 'name').then((parentDoc) => {
      let foldername = req.body.name;
      let counter = 1;
      const comparator = (name, el) => el.name === name;
      while (parentDoc.children.some(comparator.bind(null, foldername))) {
        foldername = req.body.name + counter;
        counter += 1;
      }
      docModel.create({
        name: foldername,
        heirarchy: parentDoc.heirarchy.concat([parentDoc.id]),
      }).then((doc) => {
        parentDoc.children.push(doc.id);
        parentDoc.save();
        const childDoc = {
          _id: doc.id,
          name: doc.name,
        };
        res.send(childDoc);
      });
    });
}

function editFolder(req, res) {
  docModel.findById(req.body.docId).then((doc) => {
    const parentDocId = doc.heirarchy[doc.heirarchy.length - 1];
    docModel.findById(parentDocId)
      .populate('children', 'name').then((parentDoc) => {
        let foldername = req.body.name;
        let counter = 1;
        const comparator = (name, el) => el.name === name && el.id !== doc.id;
        while (parentDoc.children.some(comparator.bind(null, foldername))) {
          foldername = req.body.name + counter;
          counter += 1;
        }
        doc.name = foldername;
        doc.save();
        res.send({
          docId: req.body.docId,
          name: foldername,
        });
      });
  });
}

function deleteFolder(req, res) {
  docModel.deleteMany({
    $or: [{ _id: req.body.docId }, { heirarchy: req.body.docId }],
  }).then(() => {
    docModel.findOne({ children: req.body.docId }).then((parentDoc) => {
      parentDoc.children.splice(parentDoc.children.indexOf(req.body.docId), 1);
      parentDoc.save();
      res.send(req.body.docId);
    });
  });
}

function addFile(req, res) {
  docModel.findById(req.body.docId).then((doc) => {
    let filename = req.body.file;
    let counter = 1;
    while (doc.files.includes(filename)) {
      filename = req.body.file + counter;
      counter += 1;
    }
    doc.files.push(filename);
    doc.save();
    res.send(filename);
  });
}

function editFile(req, res) {
  if (req.body.oldFile === req.body.newFile) res.send(req.body);
  else {
    docModel.findById(req.body.docId).then((doc) => {
      const { oldFile } = req.body;
      const fileIndex = doc.files.indexOf(oldFile);
      let { newFile } = req.body;
      let counter = 1;
      while (doc.files.includes(newFile)) {
        newFile = req.body.newFile + counter;
        counter += 1;
      }
      doc.files[fileIndex] = newFile;
      doc.markModified('files');
      doc.save();
      res.send({ oldFile, newFile });
    });
  }
}

function deleteFile(req, res) {
  docModel.findById(req.body.docId).then((doc) => {
    doc.files.splice(doc.files.indexOf(req.body.file), 1);
    doc.save();
    res.send(req.body.file);
  });
}

module.exports = {
  getFolderData, addFolder, editFolder, deleteFolder, addFile, editFile, deleteFile,
};
