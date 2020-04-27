const initialState = {
  name: '',
  docId: '',
  children: [],
  heirarchy: [],
  files: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DOC':
      return {
        ...state,
        name: action.name,
        children: action.children,
        heirarchy: action.heirarchy,
        files: action.files,
        docId: action._id,
      };
    case 'ADD_FILE':
      return {
        ...state,
        files: state.files.concat([action.file]),
      };
    case 'ADD_FOLDER':
      return {
        ...state,
        children: state.children.concat([action.folder]),
      };
    case 'EDIT_FOLDER':
      return {
        ...state,
        children: state.children.map((folder) => {
          if (folder._id === action.docId) {
            return {
              ...folder,
              name: action.name,
            };
          }
          return folder;
        }),
      };
    case 'EDIT_FILE':
      return {
        ...state,
        files: state.files.map((file) => {
          if (file === action.oldFile) return action.newFile;
          return file;
        }),
      };
    case 'DELETE_FILE':
      return {
        ...state,
        files: state.files.filter((file) => file !== action.file),
      };
    case 'DELETE_FOLDER':
      return {
        ...state,
        children: state.children.filter((child) => child._id !== action.folderId),
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
