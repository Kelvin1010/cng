import { useEffect, useState } from "react";
import { useLoadIfcModel, useSelectedMetaObj, useSetupScene, useShowInspector } from "./ifcHooks";
import { IFCLoader } from 'web-ifc-three/IFCLoader';

import Stats from "stats.js/src/Stats";

import { Spin } from 'antd';

import './index.style.css';
import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";
import IFCToolbar from "./toolbar";

const IfcViewer = ({ modelUrl, onShowInspector }) => {
  const [viewer, setViewer] = useState(null);
  const [ifcURL, setIfcURL] = useState(null);
  const [ifcModel, setIfcModel] = useState(null);
  const [selectedMetaObj, setSelectedMetaObj] = useState(null);
  const [loadPercentage, setLoadPercentage]= useState(0);

  function releaseMemory(viewer) {
    viewer.dispose();
    viewer = null;
    viewer = new IfcViewerAPI({ container });
    viewer.IFC.setWasmPath("../../../");
    addStats();
  }

  const freeMemory = (viewer) => {
    if (viewer && viewer.IFC) {
      viewer.IFC.loader.ifcManager.dispose();
      viewer.IFC.loader = null;
      viewer.IFC.loader = new IFCLoader();

      // viewer.IFC.loader.ifcManager.useWebWorkers(true, 'IFCWorker.js');
      viewer.IFC.loader.ifcManager.setWasmPath('../../');
      console.log('free memory');
    }
    if (ifcModel)
      setIfcModel(null);
  }

  useEffect(() => {
    if (modelUrl) {
      fetch(modelUrl).then(resp => resp.blob()).then(blob => {
        const _ifcURL = URL.createObjectURL(blob);
        setIfcURL(_ifcURL);
      });
    }
  }, [modelUrl])

  useEffect(() => {
    if (ifcURL) {
      const container = document.getElementById('viewer-container');
      // const progressText = document.getElementById('loading-progress');

      var _viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
      // viewer.grid.setGrid(100, 50);
      // viewer.axes.setAxes();

      // _viewer.IFC.loader.ifcManager.useWebWorkers(true, 'IFCWorker.js');

      // freeMemory(_viewer);
      // _viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });

      // _viewer.IFC.loader.ifcManager.setOnProgress((event) => {
      //   const percentage = Math.floor((event.loaded * 100) / event.total);
      //   if(progressText)
      //   progressText.innerText = `Loaded ${percentage}%`;
      //   // console.log(percentage);
      //   // setLoadPercentage(percentage);
      // });
      
      // _viewer.IFC.loader.ifcManager.useWebWorkers(true, 'IFCWorker.js');
      _viewer.IFC.setWasmPath('../../');
      
      _viewer.IFC.loadIfcUrl(ifcURL).then(model => {
        setIfcModel(model);
        setViewer(_viewer);
      })
    }
  }, [ifcURL])

  useEffect(() => {
    if (ifcModel) {
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

      window.onkeydown = (event) => {
        if (event.code === 'KeyC') {
          viewer.IFC.selector.unpickIfcItems();
          viewer.IFC.selector.unHighlightIfcItems();
        }
      }
    }
  }, [viewer, ifcModel])

  useEffect(() => {
    if (onShowInspector)
      onShowInspector(viewer, selectedMetaObj);
  }, [selectedMetaObj])

  // var viewer = useSetupScene('viewer-container');
  // const ifcURL = '../../ifc/Duplex.ifc';
  // const ifcURL = modelUrl;// 'ifc/Duplex.ifc';
  // const ifcModel = useLoadIfcModel(viewer, modelUrl);
  // const selectedMetaObj = useSelectedMetaObj(viewer, ifcModel);
  // useShowInspector(viewer, selectedMetaObj, onShowInspector);

  useEffect(() => {
    return () => {
      freeMemory(viewer);
    }
  }, [viewer])

  return (
    <>
      <IFCToolbar></IFCToolbar>
      {/* <div id='loading-progress' style={{ position: 'absolute', top: '55%', left: '50%', height: '80px', width: '80px', zIndex: 10000 }}></div> */}
      <div id='viewer-container' style={{ position: 'relative', height: '100%', width: '100%' }} />
      {ifcModel == null && <Spin tip={`Loading...`} size="large" style={{ position: 'absolute', top: '50%', left: '50%' }} />}
    </>
  )
}

export default IfcViewer;