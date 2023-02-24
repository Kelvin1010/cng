import { TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import bimClient from '../connection/bimClient';
import { singularize } from '../utils/wordUtils';
const { SHOW_PARENT } = TreeSelect;
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

const mapper = (
  _treeData,
  valueField,
  tilteField,
  childrenField,
  parentTilte,
  changeLeafTitle = true
) => {
  const mappedData = _treeData.map((e) => {
    e.value = e[valueField];
    e.key = e.value;
    e.title = e[childrenField]
      ? e[tilteField]
      : e[tilteField] + (parentTilte && changeLeafTitle ? ' ' + singularize(parentTilte) : '');
    if (e[childrenField])
      e.children = mapper(
        e[childrenField],
        valueField,
        tilteField,
        childrenField,
        e.title,
        changeLeafTitle
      );
    return e;
  });
  return mappedData;
};

const ZTreeSelect = ({
  datasource,
  valueField,
  tilteField,
  childrenField,
  changeLeafTitle,
  allowClear,
  treeCheckable,
  onChange,
  value,
  filter,
}) => {
  const _treeCheckable = treeCheckable === 'false' ? false : true;
  const _changeLeafTitle = changeLeafTitle === 'false' ? false : true;

  const [currValue, setCurrValue] = useState(value);
  const [data, setData] = useState();
  const [tProps, setTProps] = useState();

  useEffect(() => {
    if (typeof datasource === 'string') {
      bimClient.get(datasource).then((resp) => {
        if (resp.status === 200) {
          const _data = resp.data.payload;
          if (_data) {
            let _mappedData = mapper(
              _data,
              valueField,
              tilteField,
              childrenField,
              null,
              _changeLeafTitle
            );
            if (filter) {
              _mappedData = filter(_mappedData);
            }
            setData(_mappedData);
          }
        }
      });
      if (value) setCurrValue(value);
    }
  }, [datasource, valueField, tilteField, value]);

  useEffect(() => {
    const onSelChange = (newValue) => {
      // console.log('onChange ', currValue);
      setCurrValue(newValue);
      if (onChange) onChange(newValue);
    };

    if (data) {
      const _tProps = {
        treeData: data,
        value: currValue,
        onChange: onSelChange,
        treeCheckable: _treeCheckable,
        allowClear: allowClear,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Please select',
        style: {
          width: '100%',
        },
      };
      setTProps(_tProps);
    }
  }, [data, currValue]);

  return (
    <>
      {tProps && (
        <TreeSelect
          {...tProps}
          getPopupContainer={(triggerNode) => {
            return triggerNode.parentNode;
          }}
        />
      )}
    </>
  );
};

export default ZTreeSelect;
