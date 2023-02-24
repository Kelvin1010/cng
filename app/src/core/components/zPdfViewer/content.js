import * as React from 'react';
import {
  Worker,
  Button,
  DocumentLoadEvent,
  Position,
  PrimaryButton,
  Tooltip,
  Viewer,
} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { CloseCircleFilled } from '@ant-design/icons';
// import 'pdfjs-dist/build/pdf.worker.js'
// import RenderAddNewNote from './renderAddNewNote';

import {
  HighlightArea,
  highlightPlugin,
  MessageIcon,
  RenderHighlightContentProps,
  RenderHighlightTargetProps,
  RenderHighlightsProps,
} from '@react-pdf-viewer/highlight';
import bimClient from '../../connection/bimClient';
// import AddNewNote from './addNewNote';
// import NoteItem from './noteItem';

const ZPContent = ({currentUser, docId, src, onCloseDocument, AddNewNoteRender, NoteItemRender, onOpenDocument }) => {
  const [message, setMessage] = React.useState('');
  const [notes, setNotes] = React.useState([]);
  const notesContainerRef = React.useRef(null);

  const [pdfUrl, setPdfUrl] = React.useState();

  const noteEles = new Map();
  const [currentDoc, setCurrentDoc] = React.useState(null);

  React.useEffect(() => {
    bimClient.get(src, {
      responseType: "blob"
    }).then(resp => {
      const pdfURL = URL.createObjectURL(resp.data);
      setPdfUrl(pdfURL);
    });
  }, [src]);

  const handleDocumentLoad = async (e) => {
    setCurrentDoc(e.doc);
    if (onOpenDocument) {
      const res = await onOpenDocument(docId);
      if (res && res.notes)
        setNotes(res.notes)
      else
        setNotes([]);
    } else
      setNotes([]);

    // if (currentDoc && currentDoc !== e.doc) {
    //   // User opens new document
    //   if (onOpenDocument) {
    //     const res = await onOpenDocument(docId);
    //     if (res && res.notes)
    //       setNotes(res.notes)
    //     else
    //       setNotes([]);
    //   } else
    //     setNotes([]);
    // }
  };

  const renderHighlightTarget = (props) => (
    <div
      style={{
        background: '#eee',
        display: 'flex',
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        transform: 'translate(0, 8px)',
        zIndex: 1,
      }}
    >
      <Tooltip
        position={Position.TopCenter}
        target={
          <Button onClick={props.toggle}>
            <MessageIcon />
          </Button>
        }
        content={() => <div style={{ width: '100px' }}>Add a note</div>}
        offset={{ left: 0, top: -8 }}
      />
    </div>
  );

  const renderHighlightContent = (props) => {
    // const addNote = () => {
    //   if (message !== '') {
    //     const note = {
    //       id: ++noteId,
    //       content: message,
    //       highlightAreas: props.highlightAreas,
    //       quote: props.selectedText,
    //     };

    //     console.log(note);
    //     setNotes(notes.concat([note]));
    //     props.cancel();
    //   }
    // };

    // return (
    //   <div
    //     style={{
    //       background: '#fff',
    //       border: '1px solid rgba(0, 0, 0, .3)',
    //       borderRadius: '2px',
    //       padding: '8px',
    //       position: 'absolute',
    //       left: `${props.selectionRegion.left}%`,
    //       top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
    //       zIndex: 1,
    //     }}
    //   >
    //     <div>
    //       <textarea
    //         rows={3}
    //         style={{
    //           border: '1px solid rgba(0, 0, 0, .3)',
    //         }}
    //         onChange={(e) => setMessage(e.target.value)}
    //       ></textarea>
    //     </div>
    //     <div
    //       style={{
    //         display: 'flex',
    //         marginTop: '8px',
    //       }}
    //     >
    //       <div style={{ marginRight: '8px' }}>
    //         <PrimaryButton onClick={addNote}>Add</PrimaryButton>
    //       </div>
    //       <Button onClick={props.cancel}>Cancel</Button>
    //     </div>
    //   </div>
    // );
    const onAddNew = (note) => {
      setNotes(notes.concat([note]));
    }
    return (
      <AddNewNoteRender
        creatorId={currentUser}
        docId={docId}
        highlightAreas={props.highlightAreas}
        selectionRegion={props.selectionRegion}
        quote={props.selectedText}
        onAddNew={onAddNew}
        cancel={props.cancel}
      ></AddNewNoteRender>
    )
  };

  const jumpToNote = (note) => {
    activateTab(3);
    const notesContainer = notesContainerRef.current;
    if (noteEles.has(note.id) && notesContainer) {
      notesContainer.scrollTop = noteEles
        .get(note.id)
        .getBoundingClientRect().top;
    }
  };

  const renderHighlights = (props) => (
    <div>
      {notes.map((note) => (
        <React.Fragment key={note.id}>
          {note.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: 'yellow',
                    opacity: 0.4,
                  },
                  props.getCssProperties(area, props.rotation)
                )}
                onClick={() => jumpToNote(note)}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  );

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlightContent,
    renderHighlights,
  });

  const { jumpToHighlightArea } = highlightPluginInstance;

  React.useEffect(() => {
    handleDocumentLoad(docId);
    return () => {
      noteEles.clear();
    };
  }, []);

  const sidebarNotes = (
    <div
      ref={notesContainerRef}
      style={{
        overflow: 'auto',
        width: '100%',
      }}
    >
      {notes.length === 0 && (
        <div style={{ textAlign: 'center' }}>There is no note</div>
      )}
      {notes.map((note) => {
        return (
          <div
            key={note.id}
            style={{
              borderBottom: '1px solid rgba(0, 0, 0, .3)',
              cursor: 'pointer',
              padding: '8px',
            }}
            onClick={() => jumpToHighlightArea(note.highlightAreas[0])}
            ref={(ref) => {
              noteEles.set(note.id, ref);
            }}
          >
            {/* <blockquote
              style={{
                borderLeft: '2px solid rgba(0, 0, 0, 0.2)',
                fontSize: '.75rem',
                lineHeight: 1.5,
                margin: '0 0 8px 0',
                paddingLeft: '8px',
                textAlign: 'justify',
              }}
            >
              {note.quote}
            </blockquote> */}
            {/* {note.content} */}
            <NoteItemRender note={note}></NoteItemRender>
          </div>
        );
      })}
    </div>
  );

  const closeDocumentHandler = () => {
    if (onCloseDocument)
      onCloseDocument();
  }

  const renderToolbar = (Toolbar) => (
    <Toolbar>
      {(slots) => {
        const {
          CurrentPageInput,
          Download,
          EnterFullScreen,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Print,
          ShowSearchPopover,
          Zoom,
          ZoomIn,
          ZoomOut,
        } = slots;
        return (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              width: '100%',
            }}
          >
            <div style={{ padding: '0px 2px' }}>
              <ShowSearchPopover />
            </div>
            <div style={{ padding: '0px 2px' }}>
              <ZoomOut />
            </div>
            <div style={{ padding: '0px 2px' }}>
              <Zoom />
            </div>
            <div style={{ padding: '0px 2px' }}>
              <ZoomIn />
            </div>
            {/* <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
              <GoToPreviousPage />
            </div>
            <div style={{ padding: '0px 2px' }}>
              <CurrentPageInput /> / <NumberOfPages />
            </div>
            <div style={{ padding: '0px 2px' }}>
              <GoToNextPage />
            </div> */}
            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
              <EnterFullScreen />
            </div>
            <div style={{ padding: '0px 2px' }}>
              <Download />
            </div>
            <div style={{ padding: '0px 2px' }}>
              <Print />
            </div>
            <div style={{ paddingRight: '10px', paddingBottom: '5px', paddingLeft: 10, color: 'red' }}>
              <a onClick={(e) => { closeDocumentHandler() }}><CloseCircleFilled /></a>
            </div>
          </div>
        );
      }}
    </Toolbar>
  );

  // const toolbarPluginInstance = toolbarPlugin({});
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) =>
    (defaultTabs = [
      {
        content: sidebarNotes,
        icon: <MessageIcon />,
        title: 'Notes',
      },
    ]),
    // defaultTabs.concat({
    //   content: sidebarNotes,
    //   icon: <MessageIcon />,
    //   title: 'Notes',
    // }),
  });
  const { activateTab } = defaultLayoutPluginInstance;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js"> */}
      {pdfUrl && <Worker workerUrl="pdf.worker.js">
        <Viewer
          fileUrl={pdfUrl}
          plugins={[highlightPluginInstance, defaultLayoutPluginInstance]}
          onDocumentLoad={handleDocumentLoad}
        />
      </Worker>}
    </div>
  );
};

export default ZPContent;
