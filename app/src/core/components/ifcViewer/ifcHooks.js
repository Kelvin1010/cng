import { useEffect, useState } from 'react';
import { IfcViewerAPI } from 'web-ifc-viewer';
import { Color } from 'three';

const setupScene = async (containerId) => {
  const container = document.getElementById(containerId);
  const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
  // viewer.grid.setGrid(100, 50);
  // viewer.axes.setAxes();
  await viewer.IFC.setWasmPath('../../');
  return viewer;
}

function useSetupScene(containerId) {
  const [viewer, setViewer] = useState(null);
  useEffect(() => {
    setupScene(containerId).then(res => setViewer(res));
  }, [containerId])
  return viewer;
}

function useShowInspector(viewer, selectedMetaObj, onShowInspector) {
  useEffect(() => {
    if (onShowInspector)
      onShowInspector(viewer, selectedMetaObj);
  }, [selectedMetaObj])
}

function useSelectedMetaObj(viewer, ifcModel) {
  const [selectedMetaObj, setSelectedMetaObj] = useState(null);
  useEffect(() => {
    if (ifcModel) {
      // window.onmousemove = () => viewer.IFC.selector.prePickIfcItem(true);

      window.ondblclick = async () => {
        const res = await viewer.IFC.selector.pickIfcItem(false);
        if (res) {
          const { modelID, id } = res;
          const props = await viewer.IFC.getProperties(modelID, id, true, true);
          props.modelID = ifcModel.uuid;
          props.externalId = props.GlobalId?.value;
          setSelectedMetaObj(props);
        }
      }

      // window.ondblclick = () => viewer.IFC.selector.highlightIfcItem();

      window.onkeydown = (event) => {
        if (event.code === 'KeyC') {
          viewer.IFC.selector.unpickIfcItems();
          viewer.IFC.selector.unHighlightIfcItems();
        }
      }
    }
  }, [ifcModel])
  return selectedMetaObj;
}

function useLoadIfcModel(viewer, url) {
  const [ifcModel, setIfcModel] = useState(null);

  useEffect(() => {
    // if (viewer) {
    //   fetch(url).then(resp => resp.blob().then(blob => {
    //     const _ifcURL = URL.createObjectURL(blob);
    //     setIfcURL(_ifcURL);
    //     viewer.IFC.loadIfcUrl(_ifcURL, true).then(model => {
    //       console.log(model);
    //       setIfcModel(model);
    //     })
    //   }));
    // }

    if (viewer) {
      fetch(url).then(resp => resp.blob()).then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        reader.addEventListener('load', (event) => {
          const src = event.target.result;

          if (viewer && viewer.IFC) {
            viewer.IFC.loadIfcUrl(src, true).then(model => {
              setIfcModel(model);
            })
          }
        });
      });
    }

    // return () => {
    //   if (viewer != null) {
    //     console.log('unmount');
    //     viewer.dispose();
    //     viewer = null;
    //   }
    // }
  }, [viewer, url])

  // useEffect(() => {
  //   async function fetchData() {
  //     const blob = await (await fetch(url)).blob();
  //     const ifcURL = URL.createObjectURL(blob);
  //     console.log(ifcURL);
  //     if (viewer && viewer.IFC) {
  //       try {
  //         const model = await viewer.IFC.loadIfcUrl(ifcURL, true);
  //         setIfcModel(model);
  //       } catch (err) { }
  //     }
  //   }
  //   fetchData();

  //   // if (viewer && viewer.IFC) {
  //   //   const blob = await fetch(url);
  //   //   const ifcURL = URL.createObjectURL(blob);
  //   //   const model = await viewer.IFC.loadIfcUrl(ifcURL, true);
  //   //   setIfcModel(model);

  //   // fetch(url).then(resp => resp.blob()).then(blob => {
  //   //   const _url = URL.createObjectURL(blob);
  //   //   viewer.IFC.loadIfcUrl(_url, true).then(model => setIfcModel(model));
  //   // })
  //   // const ifcURL = URL.createObjectURL(url);
  //   // viewer.IFC.loadIfcUrl(ifcURL, true).then(model => setIfcModel(model));
  //   // }
  //   return () => {
  //     if (viewer != null) {
  //       viewer.dispose();
  //       viewer = null;
  //     }
  //   }
  // }, [viewer, url])

  return ifcModel;
}

export { useSetupScene, useLoadIfcModel, useSelectedMetaObj, useShowInspector }