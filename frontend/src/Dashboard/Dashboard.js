import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Dashboard.css';
import * as actions from '../store/actions';

function Dashboard() {
  const reducerData = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const { docId } = useParams();
  useEffect(() => dispatch(actions.fetchDocData(docId)), [docId]);

  const [editFolderObj, setEditFolderObj] = useState({});
  const [editFileVal, setEditFileVal] = useState('');

  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [showEditFolderModal, setshowEditFolderModal] = useState(false);
  const [showEditFileModal, setshowEditFileModal] = useState(false);

  const handleCloseFolderModal = () => setShowFolderModal(false);
  const handleShowFolderModal = () => setShowFolderModal(true);
  const handleCloseFileModal = () => setShowFileModal(false);
  const handleShowFileModal = () => setShowFileModal(true);
  const handleCloseEditFolderModal = () => setshowEditFolderModal(false);
  const handleShowEditFolderModal = (folder) => {
    setEditFolderObj(folder);
    setshowEditFolderModal(true);
  };
  const handleCloseEditFileModal = () => setshowEditFileModal(false);
  const handleShowEditFileModal = (file) => {
    setEditFileVal(file);
    setshowEditFileModal(true);
  };

  return (
    <Container className="DASHBOARD mt-2">
      <Row>
        <Col>
          <Breadcrumb>
            { reducerData.heirarchy.map((node) => (
              <Breadcrumb.Item key={node._id}><Link to={`/${node._id}`}>{node.name}</Link></Breadcrumb.Item>
            ))}
            <Breadcrumb.Item active>{reducerData.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <h4 className="d-inline-block">Folders</h4>
            <Button className="add-button" variant="primary" onClick={handleShowFolderModal}>Add</Button>
          </div>
          <ListGroup>
            { reducerData.children.map((folder) => (
              <ListGroup.Item key={folder.name}>
                <Link to={`/${folder._id}`}>{`📁 ${folder.name}`}</Link>
                <span className="delete-icon" onClick={() => dispatch(actions.deleteFolder(folder._id))} onKeyDown={() => dispatch(actions.deleteFolder(folder._id))} role="button" tabIndex="-1">&#128465;</span>
                <span className="edit-icon" onClick={handleShowEditFolderModal.bind(null, folder)} onKeyDown={handleShowEditFolderModal.bind(null, folder)} role="button" tabIndex="-1">&#9998;</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-4">
            <h4 className="d-inline-block">Files</h4>
            <Button className="add-button" variant="primary" onClick={handleShowFileModal}>Add</Button>
          </div>
          <ListGroup>
            { reducerData.files.map((file) => (
              <ListGroup.Item key={file}>
                <span>{file}</span>
                <span className="delete-icon" onClick={() => dispatch(actions.deleteFile({ docId: reducerData.docId, file }))} onKeyDown={() => dispatch(actions.deleteFile({ docId: reducerData.docId, file }))} role="button" tabIndex="-1">&#128465;</span>
                <span className="edit-icon" onClick={handleShowEditFileModal.bind(null, file)} onKeyDown={handleShowEditFileModal.bind(null, file)} role="button" tabIndex="-1">&#9998;</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Modal show={showFolderModal} onHide={handleCloseFolderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Folder</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(ev) => dispatch(actions.addFolder(ev, handleCloseFolderModal))}>
          <Modal.Body>
            <Form.Label>Folder Name</Form.Label>
            <Form.Control type="text" placeholder="Folder Name" name="name" required />
            <Form.Control type="hidden" name="docId" value={reducerData.docId} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFolderModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showFileModal} onHide={handleCloseFileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add File</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(ev) => dispatch(actions.addFile(ev, handleCloseFileModal))}>
          <Modal.Body>
            <Form.Label>File Name</Form.Label>
            <Form.Control type="text" placeholder="File Name" name="file" required />
            <Form.Control type="hidden" name="docId" value={reducerData.docId} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFileModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add File
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEditFolderModal} onHide={handleCloseEditFolderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rename Folder</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(ev) => dispatch(actions.editFolder(ev, handleCloseEditFolderModal))}>
          <Modal.Body>
            <Form.Label>Folder Name</Form.Label>
            <Form.Control type="text" placeholder="Folder Name" name="name" defaultValue={editFolderObj.name} required />
            <Form.Control type="hidden" name="docId" value={editFolderObj._id} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditFolderModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Rename Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEditFileModal} onHide={handleCloseEditFileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rename File</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(ev) => dispatch(actions.editFile(ev, handleCloseEditFileModal))}>
          <Modal.Body>
            <Form.Label>File Name</Form.Label>
            <Form.Control type="text" placeholder="Folder Name" name="newFile" defaultValue={editFileVal} required />
            <Form.Control type="hidden" name="oldFile" value={editFileVal} />
            <Form.Control type="hidden" name="docId" value={reducerData.docId} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditFolderModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Rename Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default Dashboard;
