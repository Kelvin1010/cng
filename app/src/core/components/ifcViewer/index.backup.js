import { useEffect, useState } from 'react';
import { IfcViewerAPI } from 'web-ifc-viewer';

import { Color } from 'three';

// //release function
// function releaseMemory() {
//   viewer.dispose();
//   viewer = null;
//   viewer = new IfcViewerAPI({ container });
//   viewer.IFC.setWasmPath('../../../');
//   addStats();
//   // if multiple models are stored in an array, reset.
//   // models.length = 0;
// }

const IfcViewer = () => {
  useEffect(() => {
    const container = document.getElementById('viewer-container');
    const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
    viewer.axes.setAxes();
    viewer.grid.setGrid();
    viewer.IFC.setWasmPath('../../');

    const input = document.getElementById("file-input");

    input.addEventListener("change",
      async (changed) => {
        // releaseMemory(viewer, container);
        const file = changed.target.files[0];
        const ifcURL = URL.createObjectURL(file);
        await viewer.IFC.loadIfcUrl(ifcURL);
        // const ifcModel = await useLoadIfc(viewer, ifcURL);
        // setIfcUrl(ifcURL);
      },
      false
    );

    window.onmousemove = () => viewer.IFC.selector.prePickIfcItem(true);

    window.onclick = async () => {
      const { modelID, id } = await viewer.IFC.selector.pickIfcItem(true);
      const props = await viewer.IFC.getProperties(modelID, id, true, false);
      console.log(props);
    }

    window.ondblclick = () => viewer.IFC.selector.highlightIfcItem();

    window.onkeydown = (event) => {
      if (event.code === 'KeyC') {
        viewer.IFC.selector.unpickIfcItems();
        viewer.IFC.selector.unHighlightIfcItems();
      }
    }

    // document.getElementById('express_22492')
    //   .addEventListener('click', () => {
    //     viewer.IFC.selector.pickIfcItemsByID(0, [22492], true);
    //   })

  }, [])
  return (
    <>
      <input type={'file'} id={"file-input"} accept={".ifc, .ifcXML, .ifcZIP"}></input>
      <div id='viewer-container' style={{ width: '100%', height: '100%' }}></div>
    </>
  )
}

export default IfcViewer;