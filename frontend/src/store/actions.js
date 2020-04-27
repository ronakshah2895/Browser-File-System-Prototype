import axios from 'axios';

export const fetchDocData = (docId) => (dispatch) => {
  axios.post(`${process.env.REACT_APP_SERVER_ROOT}get_folder_data`, { docId }).then((doc) => {
    dispatch({ type: 'FETCH_DOC', ...doc.data });
  });
};

export const addFolder = (ev, callback) => (dispatch) => {
  ev.preventDefault();
  const { target } = ev;
  const formData = new FormData(target);
  axios.post(`${process.env.REACT_APP_SERVER_ROOT}create_folder`, formData).then((folder) => {
    dispatch({ type: 'ADD_FOLDER', folder: folder.data });
    callback();
  });
};

export const editFolder = (ev, callback) => (dispatch) => {
  ev.preventDefault();
  const { target } = ev;
  const formData = new FormData(target);
  axios.post(`${process.env.REACT_APP_SERVER_ROOT}rename_folder`, formData).then((folder) => {
    dispatch({ type: 'EDIT_FOLDER', ...folder.data });
    callback();
  });
};

export const deleteFolder = (docId) => (dispatch) => {
  axios.post(`${process.env.REACT_APP_SERVER_ROOT}delete_folder`, { docId }).then((folderId) => {
    dispatch({ type: 'DELETE_FOLDER', folderId: folderId.data });
  });
};

export const addFile = (ev, callback) => (dispatch) => {
  ev.preventDefault();
  const { target } = ev;
  const formData = new FormData(target);
  axios.post(`${process.env.REACT_APP_SERVER_ROOT}create_file`, formData).then((file) => {
    dispatch({ type: 'ADD_FILE', file: file.data });
    callback();
  });
};

export const editFile = (ev, callback) => (dispatch) => {
  ev.preventDefault();
  const { target } = ev;
  const formData = new FormData(target);
  axios.post(`${process.env.REACT_APP_SERVER_ROOT}rename_file`, formData).then((file) => {
    dispatch({ type: 'EDIT_FILE', ...file.data });
    callback();
  });
};

export const deleteFile = (dataObj) => (dispatch) => {
  axios.post(`${process.env.REACT_APP_SERVER_ROOT}delete_file`, dataObj).then((file) => {
    dispatch({ type: 'DELETE_FILE', file: file.data });
  });
};
