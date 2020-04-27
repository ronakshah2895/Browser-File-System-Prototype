module.exports = (Schema) => {
  const Doc = new Schema({
    name: {
      type: String,
      required: true,
    },
    files: [{
      type: String,
    }],
    children: [{
      type: Schema.Types.ObjectId,
      ref: 'Doc',
    }],
    heirarchy: [{
      type: Schema.Types.ObjectId,
      ref: 'Doc',
    }],
    isRoot: {
      type: Boolean,
      default: false,
    },
  });
  return Doc;
};
