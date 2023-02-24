import { Component } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import './index.style.css';
import Stats from 'stats.js/src/Stats';
import { Spin } from "antd";
import { Color } from "three";
import bimClient from "../../connection/bimClient";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from 'three-mesh-bvh';
import IFCToolbar from "./toolbar";
import { saveAs } from "file-saver";

class IfcViewer extends Component {
  state = {
    loaded: false,
    selectedMetaObj: null,
    compareModelUrls: [],
    models: {},
    snapshot: null,
  };

  constructor(props) {
    super(props);
    this.modelUrl = props.modelUrl;
    this.compareModelUrls = props.compareModelUrls;
    this.onShowInspector = props.onShowInspector;
    this.onSelectedElementChange = props.onSelectedElementChange;
  }

  addStats() {
    const stats = new Stats();
    stats.showPanel(2);
    document.body.append(stats.dom);
    this.viewer.context.stats = stats;
  };

  releaseMemory() {
    if (this.viewer) {
      this.viewer.dispose();
      this.state.models = null;
      console.log('free memory');
    }
    this.viewer = null;
  }

  saveFile = function (strData, filename) {
    saveAs(strData, filename);
  }

  _fetchModel(url) {
    const ifcModel = bimClient.get(url, {
      responseType: "blob"
    }).then(resp => {
      const ifcURL = URL.createObjectURL(resp.data);
      let res = this.viewer.IFC.loadIfcUrl(ifcURL, true).then(model => {
        this.setState({ loaded: true });
        const prvModels = this.state.models;
        prvModels[url] = model;
        this.setState({ models: prvModels });
        res = model;
        return res;
      });
      return res;
    });
    return ifcModel;
  }

  _unloadModels(urls) {
    if (urls) {
      const prvModels = this.state.models;
      urls.forEach(e => {
        const model = prvModels[e];
        if (model)
          this.viewer.IFC.loader.ifcManager.close(model.modelID, model.parent);
        prvModels[e] = null;
      });
      urls.forEach(e => delete prvModels[e]);
      this.setState({ models: prvModels });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.compareModelUrls !== this.props.compareModelUrls) {
      const _compareModelUrls = this.props.compareModelUrls;

      const prvModels = this.state.models;

      const removedModels = Object.keys(prvModels).map(key => {
        if (!_compareModelUrls.some(e => e == key) && key != this.modelUrl) {
          return key;
        }
      });

      this._unloadModels(removedModels);

      _compareModelUrls.forEach(url => {
        if (!prvModels.hasOwnProperty(url)) {
          this.setState({ loaded: false })
          this._fetchModel(url);
        }
      });
    }
  }

  componentDidMount() {
    const container = document.getElementById("viewer-container");
    const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
    // viewer.grid.setGrid(100, 50);
    viewer.axes.setAxes();
    viewer.clipper.active = true;
    // viewer.dimensions.enabled = true;
    viewer.IFC.loader.ifcManager.useWebWorkers(true, "IFCWorker.js");
    viewer.IFC.setWasmPath("../../");
    this.viewer = viewer;

    // viewer.IFC.loader.ifcManager.applyWebIfcConfig({
    //   USE_FAST_BOOLS: true,
    //   COORDINATE_TO_ORIGIN: true
    // });

    // viewer.context.renderer.postProduction.active = true;

    // this.addStats();

    if (this.modelUrl) {
      this._fetchModel(this.modelUrl).then(model => {
        // Sets up optimized picking
        // this.viewer.IFC.setupThreeMeshBVH(
        //   computeBoundsTree,
        //   disposeBoundsTree,
        //   acceleratedRaycast);

        window.onclick = async () => {
          // const res = await this.viewer.IFC.selector.pickIfcItem(false);
          // console.log(res);
        }

        window.ondblclick = async () => {
          if (!this.viewer)
            return;
          if (this.viewer.dimensions.active) {
            this.viewer.dimensions.previewActive = true;
            this.viewer.dimensions.create();
          } else {
            const res = await this.viewer.IFC.selector.pickIfcItem(true);
            if (res) {
              const { modelID, id } = res;

              const _model = Object.values(this.state.models).find(v => v.modelID == modelID);
              // console.log(_model);
              const props = await this.viewer.IFC.getProperties(modelID, id, true, true);
              props.modelID = _model?.uuid;
              props.externalId = props.GlobalId?.value;
              // console.log(props);
              this.setState({ selectedMetaObj: props });
              if (this.onShowInspector)
                this.onShowInspector(this.viewer, props);

              if (this.onSelectedElementChange) {
                this.onSelectedElementChange(modelID, id);
              }
            } else {
              await this.viewer.IFC.selector.unpickIfcItems()
              this.onShowInspector(this.viewer, null)
            }
          }
        }

        window.onkeydown = async (event) => {
          if (event.code === "KeyP") {
            this.viewer.clipper.createPlane();
          }
          else if (event.code === "KeyO") {
            this.viewer.clipper.deletePlane();
          }
          else if (event.code === "KeyT") {
            this.viewer.clipper.toggle();
          }
          else if (event.code === 'Delete') {
            this.viewer.clipper.deletePlane();
            this.viewer.dimensions.deleteAll();
          }
          else if (event.code === 'Escape') {
            this.viewer.IFC.selector.unpickIfcItems();
            this.viewer.IFC.selector.unHighlightIfcItems();
            this.viewer.dimensions.cancelDrawing();
            this.viewer.dimensions.previewActive = false;
          } else if (event.code === 'KeyD') {
            // this.viewer.dimensions.active = true;
            this.viewer.dimensions.previewActive = true;
            this.viewer.dimensions.create();
          }
          else if (event.code === 'KeyC') {
            this.viewer.context.ifcCamera.toggleProjection();
          } else if (event.code === 'KeyA') {
            var strMime = "image/jpeg";
            var strDownloadMime = "image/octet-stream";
            var imgData = this.viewer.context.renderer.renderer.domElement.toDataURL(strMime);
            // var imgData = this.viewer.context.renderer.renderer.getCurrentViewport().
            // console.log(imgData);
            this.setState({...this.state, snapshot: imgData})
            // this.saveFile(imgData.replace(strMime, strDownloadMime), "test.jpg");

            // const camera = viewer.context.ifcCamera;
            // const cameraControls = viewer.context.ifcCamera.cameraControls;
            // viewer.context.ifcCamera.cameraControls.zoom(camera.zoom/2, true);
            // viewer.context.ifcCamera.cameraControls.distance = 2;
            // cameraControls.polarAngle = 0;
            // cameraControls.azimuthAngle = 0;
            // console.log(cameraControls.azimuthAngle);
            // viewer.IFC.loader.ifcManager.removeFromSubset(0, [0])
            // viewer.context.
            // viewer.IFC.loader.ifcManager.subsets.
            // this.viewer.dimensions.getDimensionsLines()
            // const subset = viewer.IFC.loader.ifcManager.removeFromSubset(0, [34])
            // subset.visible = false;
            // const subset = this.viewer.IFC.loader.ifcManager.createSubset({
            //   modelID,
            //   scene: this.viewer.context.scene,
            //   ids: [id],
            //   removePrevious: false,
            //   customID: id,
            // });
            // console.log(subset);
            // subset.visible = false;

            // const geo = await this.viewer.IFC.loader.ifcManager.ifcAPI.GetGeometry(modelID, id);
            // const mesh = await this.viewer.IFC.loader.ifcManager.ifcAPI.GetFlatMesh(modelID, id);

            // const objects = this.viewer.context.castRayIfc()
            // console.log(objects);

            // console.log(id);
            // const obj = await this.viewer.IFC.loader.ifcManager.byId(modelID, id)
            // this.viewer.IFC.loader.ifcManager.createSubset()
            // console.log(obj);



            // const structure = await this.viewer.IFC.getSpatialStructure(0);
            // console.log(structure);

          }
        }

        // window.onmousemove = viewer.prepickIfcItem;
        // window.ondblclick = viewer.clipper.createPlane();

        // this.setupAllCategories();
        if (this.props.onLoaded) {
          this.props.onLoaded(this.viewer);
        }
      });

    } else {
      this.setState({
        loaded: true
      })
    }
  }

  componentWillUnmount() {
    this.releaseMemory();
    window.onclick = null;
    window.ondblclick = null;
    window.onkeydown = null;
  }

  render() {
    return (
      <>
        <IFCToolbar viewer={this.viewer}></IFCToolbar>
        {/* <div id='stats' style={{ position: 'absolute', top: '5%', left: '5%', height: '80px', width: '80px', zIndex: 10000 }}></div> */}
        <div id='viewer-container'
          style={
            {
              position: 'relative', height: '80%', width: '80%'
            }
          }
        />
        <div style={{height: 200, width: 200, backgroundColor: 'rebeccapurple'}}>
          {/* <p>Taken from wikpedia</p> */}
          <img src={this.state.snapshot} alt="Snapshot" />
        </div>
        {!this.state.loaded && <Spin tip={`Loading...`} size="large" style={{ position: 'absolute', top: '40%', left: '40%' }} />}
      </>
    )
  }
}

export default IfcViewer;