import { Select, Tag } from 'antd';
import React, { useCallback, useState } from 'react';
import './zSelect.style.scss';
const { Option } = Select;


const ZSelect = (props) => {
  const { name, width, placeholder, options, colormap, value, selectMode, onChange } = props;

  const [_value, setValue] = useState(value);

  const tagRender = useCallback((props) => {
    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color={colormap && colormap[value] ? colormap[value] : ''}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  }, []);

  const _selectMode = selectMode ? selectMode : 'multiple'
  const selectProps = {
    name: name,
    mode: _selectMode,
    style: {
      width: width
    },
    value,
    options,
    onChange: (newValue) => {
      setValue(newValue);
      if (onChange)
        onChange(newValue);
    },
    maxTagCount: 'responsive',
    tagRender: tagRender,
    showArrow: true,
    placeholder: placeholder
  };

  const {...fwdProps} = props;
  delete fwdProps.selectMode;

  return (
    <>
      <Select
        {...fwdProps}
        {...selectProps}
        getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode;
        }}
      />
    </>

  )
}

export default ZSelect;