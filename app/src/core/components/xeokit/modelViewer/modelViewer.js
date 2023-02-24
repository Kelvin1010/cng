import "./xeokit-bim-viewer.css";
import "./modelViewer.style.css";
import "../../../utils/fa-free-5.11.2-web/css/all.min.css";
import "./treeview.css";

import React from "react";

import {
  Server,
  BIMViewer,
  LocaleService,
  // } from "@xeokit/xeokit-bim-viewer";
} from "../../../../packages/xeokit-bim-viewer/index";

import { messages as localeMessages } from "@xeokit/xeokit-bim-viewer/dist/messages";

class ModelViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedObjId: '',
    selectedObjMeta: {}
  }

  initViewer = function (
    projectId,
    modelId = null,
    viewerConfigs = null,
    tab = null,
    locale = "en",
    enableEditModels = "false",
    openExplorer = "false"
  ) {
    if (!projectId) {
      return;
    }

    const _openExplorer = openExplorer;
    setExplorerOpen(_openExplorer === "true");

    const _enableEditModels = enableEditModels === "true";

    const server = new Server({
      dataDir: "./data",
    });

    const bimViewer = new BIMViewer(server, {
      localeService: new LocaleService({
        messages: localeMessages,
        locale: locale,
      }),
      canvasElement: document.getElementById("myCanvas"), // WebGL canvas
      keyboardEventsElement: document.getElementById("myCanvas"), // Optional, defaults to canvasElement
      explorerElement: document.getElementById("myExplorer"), // Left panel
      toolbarElement: document.getElementById("myToolbar"), // Toolbar
      inspectorElement: document.getElementById("myInspector"), // Right panel
      navCubeCanvasElement: document.getElementById("myNavCubeCanvas"),
      busyModelBackdropElement: document.getElementById("myViewer"),
      enableEditModels: _enableEditModels,
    });

    bimViewer.on("openExplorer", () => {
      setExplorerOpen(true);
    });

    bimViewer.on("openInspector", () => {
      // setInspectorOpen(true);
      const objectId = this.state.selectedObjId;
      const metaObject = objectId? bimViewer.viewer.metaScene.metaObjects[objectId]: null;
      if (this.props.onShowInspector)
        this.props.onShowInspector(bimViewer, metaObject);
    });

    bimViewer.on("addModel", (event) => {
      // "Add" selected in Models tab's context menu
      console.log("addModel: " + JSON.stringify(event, null, "\t"));
    });

    bimViewer.on("editModel", (event) => {
      // "Edit" selected in Models tab's context menu
      console.log("editModel: " + JSON.stringify(event, null, "\t"));
    });

    bimViewer.on("deleteModel", (event) => {
      // "Delete" selected in Models tab's context menu
      console.log("deleteModel: " + JSON.stringify(event, null, "\t"));
    });

    const _viewerConfigs = viewerConfigs;
    if (_viewerConfigs) {
      const configNameVals = _viewerConfigs.split(",");
      for (let i = 0, len = configNameVals.length; i < len; i++) {
        const configNameValStr = configNameVals[i];
        const configNameVal = configNameValStr.split(":");
        const configName = configNameVal[0];
        const configVal = configNameVal[1];
        bimViewer.setConfig(configName, configVal);
      }
    }

    // if(false)
    bimViewer.loadProject(
      projectId,
      () => {
        const _modelId = modelId;
        if (_modelId) {
          bimViewer.loadModel(_modelId);
        }
        const _tab = tab;
        if (_tab) {
          bimViewer.openTab(_tab);
        }

        const metaModel = bimViewer.viewer.metaScene?.metaModels["design"];
        if (metaModel) {
          console.log(metaModel.id); // "myModel"
          console.log(metaModel.projectId); // 131073
          console.log(metaModel.revisionId); // 65539
          console.log(metaModel.author); // "Autodesk"
          console.log(metaModel.createdAt); // eg. "24 August, 2021"
          console.log(metaModel.creatingApplication); // eg. "Revit"
          console.log(metaModel.schema); // eg. "IFC4"
          console.log(metaModel.propertySets); // [..]
          console.log(metaModel.rootMetaObject); // MetaObject
        }

        var lastEntity = null;
        var lastColorize = null;

        bimViewer.viewer.cameraControl.on('picked', pickResult => {
          if (!pickResult.entity) {
            return;
          }

          if (!lastEntity || pickResult.entity.id !== lastEntity.id) {

            if (lastEntity) {
              lastEntity.colorize = lastColorize;
            }

            lastEntity = pickResult.entity;
            lastColorize = pickResult.entity.colorize ? pickResult.entity.colorize.slice() : null;

            pickResult.entity.colorize = [0.0, 1.0, 0.0];
            // pickResult.entity.selected = true;
            bimViewer.setObjectsSelected([lastEntity.id]);
            const objectId = pickResult.entity.id;
            const metaObject = bimViewer.viewer.metaScene.metaObjects[objectId];
            this.props.onShowInspector(bimViewer, metaObject);
            this.setState({
              selectedObjId: objectId
            })
          }
          else if (pickResult.entity.id === lastEntity.id) {
            lastEntity.colorize = lastColorize;
            lastEntity = null;
            // pickResult.entity.selected = false;
            bimViewer.setObjectsSelected([])
            this.setState({ selectedObjId: '' });
          }
        })

        bimViewer.viewer.cameraControl.on('pickedNothing', () => {
          if (lastEntity) {
            lastEntity.colorize = lastColorize;
            // lastEntity.selected = false;
            bimViewer.setObjectsSelected([])
            lastEntity = null;
            this.setState({ selectedObjId: '' })
          }
        })

        bimViewer.viewer.cameraControl.on('rightClick', (e) => {
          const event = e.event; // Mouse event
          const canvasPos = e.canvasPos;
          console.log(event);
        })
      },
      (errorMsg) => {
        console.error(errorMsg);
      }
    );

    function setExplorerOpen(explorerOpen) {
      const toggle = document.getElementById("explorer_toggle");
      if (toggle) {
        toggle.checked = explorerOpen;
      }
    }

    function setInspectorOpen(inspectorOpen) {
      const toggle = document.getElementById("inspector_toggle");
      if (toggle) {
        toggle.checked = inspectorOpen;
      }
    }
    return bimViewer;
  };
  componentDidMount() {
    this.bimViewer = this.initViewer(this.props.projectId || 'Duplex');//OTCConferenceCenter  IfcOpenHouse4_multiple  WestRiversideHospital
  }

  componentWillUnmount() {
    this.bimViewer?.destroy();
  }

  render() {

    return (
      <>
        <div
        // style={{
        //   position: "relative",
        //   width: "100%",
        //   height: "100%",
        //   display: "flex",
        //   flexDirection: "row",
        //   // overflow: "hidden",
        // }}
        >
          <input type="checkbox" id="explorer_toggle" />
          <input type="checkbox" id="inspector_toggle" />
          <div id="myExplorer"></div>
          <div id="myViewer" 
          style={{width: this.props.width}}
          >
            <canvas id="myCanvas"></canvas>
            <canvas id="myNavCubeCanvas"></canvas>
          </div>
          <div id="myInspector"></div>
        </div>
        <div id="myToolbar"></div>
      </>
    );
  }
}

export default ModelViewer;
