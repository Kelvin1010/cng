const Role = require('../model').role;
const helper = require('../core/utils/helper.util');
const { deepCopy } = require('../core/utils/object.util');
const permissions = require('./permissions.json');

function getPermissionTree() {
  const data = deepCopy(permissions).reduce(function (r, a) {
    function getParent(s, b) {
      return b.id === a.parentId ? b : (b.nodes && b.nodes.reduce(getParent, s));
    }

    var index = 0, node;
    if ('parentId' in a) {
      node = r.reduce(getParent, {});
    }
    if (node && Object.keys(node).length) {
      node.nodes = node.nodes || [];
      node.nodes.push(a);
    } else {
      while (index < r.length) {
        if (r[index].parentId === a.id) {
          a.nodes = (a.nodes || []).concat(r.splice(index, 1));
        } else {
          index++;
        }
      }
      r.push(a);
    }
    return r;
  }, []);
  return data;
}

function treeSearch(nodes, ids) {
  var res = []
  if (!nodes || nodes.length < 1)
    return res
  nodes.forEach(node => {
    if (ids.includes(node.id)) {
      res.push(node);
    } else {
      const _res = treeSearch(node.nodes, ids);
      if (_res.length > 0)
        res = res.concat(_res)
    }
  });
  return res;
}

function getAllBranch(nodes) {
  var permissions = []
  if (!nodes || nodes.length < 1)
    return permissions;
  nodes.forEach(node => {
    permissions.push(node.code);
    const childs = getAllBranch(node.nodes);
    if (childs.length > 0)
      permissions = permissions.concat(childs);
  });
  return permissions;
}

function getPermissions(ids) {
  // const parentNodes = deepCopy(permissions).filter(e => ids.includes(e.id));
  const tree = getPermissionTree();
  const res = treeSearch(tree, ids)
  const permissions = getAllBranch(res);
  return permissions;
}

function getAll() {
  const meta = null;
  const data = getPermissionTree();
  return { payload: data, meta };
}

function getAllFlatted() {
  return getAllBranch(permissions);
}

function getById(id) {
  var data = getPermissionTree();
  data.filter(e => e.id == id);
  return { payload: data, meta: null }
}

module.exports = {
  getAll,
  getById,
  getPermissions,
  getAllFlatted
};
