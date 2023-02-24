import { useState, useEffect } from 'react';
import { IfcViewerAPI } from 'web-ifc-viewer';
import { Color } from 'three';
// import bimClient from '../../core/connection/bimClient';

async function useSetupScene(containerId) {
  const container = document.getElementById(containerId);
  const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
  viewer.grid.setGrid();
  viewer.axes.setAxes();
  await viewer.IFC.setWasmPath('../../');
  return viewer;
}

async function useLoadIfc(viewer, url) {
  if (url) {
    const ifcModel = await viewer.IFC.loadIfcUrl(url);
    return ifcModel;
  } else
    return null;
}

function useAllIds(ifcModel) {
  return Array.from(
    new Set(ifcModel.geometry.attributes.expressID.array),
  );
}

function useReplaceOriginalModelBySubset(viewer, ifcModel, subset) {
  const items = viewer.context.items;

  items.pickableIfcModels = items.pickableIfcModels.filter(model => model !== ifcModel);
  items.ifcModels = items.ifcModels.filter(model => model !== ifcModel);
  ifcModel.removeFromParent();

  items.ifcModels.push(subset);
  items.pickableIfcModels.push(subset);
}

function useWholeSubset(viewer, ifcModel, allIDs) {
  return viewer.IFC.loader.ifcManager.createSubset({
    modelID: ifcModel.modelID,
    ids: allIDs,
    applyBVH: true,
    scene: ifcModel.parent,
    removePrevious: true,
    customID: 'full-model-subset',
  });
}

function useShowAllItems(viewer, ids) {
  viewer.IFC.loader.ifcManager.createSubset({
    modelID: 0,
    ids,
    removePrevious: false,
    applyBVH: true,
    customID: 'full-model-subset',
  });
}

function useHideClickedItem(viewer) {
  const result = viewer.context.castRayIfc();
  if (!result) return;
  const manager = viewer.IFC.loader.ifcManager;
  const id = manager.getExpressId(result.object.geometry, result.faceIndex);
  viewer.IFC.loader.ifcManager.removeFromSubset(
    0,
    [id],
    'full-model-subset',
  );
}

export { useSetupScene, useLoadIfc, useAllIds, useReplaceOriginalModelBySubset, useWholeSubset, useShowAllItems, useHideClickedItem }

