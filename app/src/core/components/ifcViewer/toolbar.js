import { cibBuffer, cilAperture, cilClearAll, cilVerticalAlignCenter, cilZoomIn, cilZoomOut, cilZoom, cilCropRotate } from "@coreui/icons";
import { UserOutlined } from '@ant-design/icons';
import CIcon from "@coreui/icons-react";
import { Button, Menu, Space } from "antd";
import { useEffect, useState } from "react";

const IFCToolbar = ({ viewer }) => {
  const [camera, setCamera] = useState(null);
  const [controls, setControls] = useState(null);
  const [planeToggle, setPlaneToggle] = useState(false);
  const [dimToggle, setDimToggle] = useState(false);

  const menu = (
    <Menu
      onClick={() => { }}
      items={[
        {
          // label: '1st menu item',
          key: '1',
          icon: <UserOutlined />,
        },
        {
          // label: '2nd menu item',
          key: '2',
          icon: <UserOutlined />,
        },
        {
          // label: '3rd menu item',
          key: '3',
          icon: <UserOutlined />,
        },
      ]}
    />
  );

  useEffect(() => {
    if (viewer) {
      const _controls = viewer.context.ifcCamera.cameraControls;
      const _camera = viewer.context.ifcCamera;
      setCamera(_camera);
      setControls(_controls);
    }
  }, [viewer])
  return (
    <div style={
      {
        position: 'fixed',
        top: 80,
        right: 550,
        zIndex: 1000,
        // width: 200,
        height: 37,
        backgroundColor: 'rgba(0,0,0,0.1)',

        // border: '1px solid gray',
        borderRadius: 7,
        display: "block",
        padding: 7
      }}>
      <Space>
        <a>
          <CIcon icon={cilZoom} size="lg" onClick={() => { if (viewer) viewer.context.fitToFrame() }} />
        </a>
        <a>
          <CIcon icon={cilZoomIn} size="lg" onClick={() => { if (controls) controls.zoom(camera.activeCamera.zoom / 2, true) }} />
        </a>
        <a>
          <CIcon icon={cilZoomOut} size="lg" onClick={() => { if (controls) controls.zoom(-camera.activeCamera.zoom / 2, true) }} />
        </a>
        <a>
          <CIcon icon={cilAperture} size="lg" onClick={() => { if (camera) camera.toggleProjection() }} />
        </a>
        {/* <a>
          <CIcon icon={cilCropRotate} size="lg" onClick={() => { if (camera) camera.toggleProjection() }} />
        </a> */}
        <a>
          <Button size="small"
            style=
            {dimToggle ?
              { backgroundColor: 'transparent', color: 'blue', border: null } :
              { backgroundColor: 'transparent', color: 'gray', border: null }
            }>
            <CIcon defaultChecked={true} icon={cilVerticalAlignCenter} size="lg" onClick={() => {
              if (viewer) {
                viewer.dimensions.enabled = !dimToggle;
                setDimToggle(!dimToggle)
              }
            }} />
          </Button>

        </a>
        <a>
          <Button size="small"
            style=
            {planeToggle ?
              { backgroundColor: 'transparent', color: 'blue', border: null } :
              { backgroundColor: 'transparent', color: 'gray', border: null }
            }>
            <CIcon defaultChecked={true} icon={cibBuffer} size="lg" onClick={() => {
              console.log(viewer.clipper);
              if (viewer) viewer.clipper.toggle(); setPlaneToggle(!planeToggle)
            }} />
          </Button>

        </a>
        <a>
          <CIcon icon={cilClearAll} size="lg" onClick={() => {
            if (viewer) {
              viewer.clipper.deletePlane();
              viewer.clipper.deleteAllPlanes();
            }
          }} />
        </a>

      </Space>
    </div>
  )
}

export default IFCToolbar;