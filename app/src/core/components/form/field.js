import {
  Form,
} from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Field = (props) => {
  const { isEdit, allowEdit, form, name, label, rules, Component, initialValue, onChange, visible, disabled, onUpdateDepends, subjectValues, dependOn } = props;
  const _visible = visible ? visible !== 'false' : true;
  const _disabled = disabled ? disabled : false;

  const [isVisible, setVisible] = useState(_visible);

  const {t} = useTranslation();
  
  useEffect(() => {
    const v = {}
    v[name] = initialValue;
    if (onUpdateDepends)
      onUpdateDepends(name, initialValue);
    form.current.setFieldsValue(v);
  }, [initialValue])

  useEffect(() => {
    var _vis = _visible;
    if (dependOn && subjectValues[dependOn.name]) {
      _vis = subjectValues[dependOn.name] == dependOn.value;
    }
    if (isEdit && allowEdit === 'false'){
      _vis = false;
    }
    setVisible(_vis)
  }, [isEdit, allowEdit, dependOn, subjectValues])

  const [value, setValue] = useState();

  return (
    <Form.Item
      name={name}
      label={t(label)}
      // hasFeedback
      rules={rules}
      hidden={!isVisible}
      // initialValue={initialValue}
    >
      {
        <Component
          name={name}
          style={{
            width: '100%',
          }}
          value={value}
          disabled={disabled}
          onChange={e => {
            const val = e.target ? e.target.value : e;
            setValue(val)
            if(onUpdateDepends)
              onUpdateDepends(name, val);
            if (onChange)
              onChange(name, val);
          }}
        />
      }
    </Form.Item>
  );
}

export default Field;
