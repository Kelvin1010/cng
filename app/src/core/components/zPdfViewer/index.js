import ZPContent from './content';
// import ZPToolbar from './toolbar';

const ZPdfViewer = ({ currentUser, docId, src, onCloseDocument, onOpenDocument, addNewNoteRender, noteItemRender }) => {
  return (
    <>
      {/* <ZPToolbar></ZPToolbar> */}
      <ZPContent
        currentUser={currentUser}
        docId={docId}
        src={src}
        onCloseDocument={onCloseDocument}
        onOpenDocument={onOpenDocument}
        AddNewNoteRender={addNewNoteRender}
        NoteItemRender={noteItemRender} />
    </>
  );
};

export default ZPdfViewer;
