import { Input } from 'antd';
import { forwardRef, useRef } from "react";
import ZForm from "../../../core/components/form/zForm"
import ZSelect from '../../../core/components/zSelect';

const BackupConfigForm = forwardRef((props, ref) => {
  const typeOptions = [
    {
      value: 0,
      label: 'Manual',
    },
    {
      value: 1,
      label: 'Auto',
    },
  ];

  const backupAtOptions = [
    {
      value: 0,
      label: '0h',
    },
    {
      value: 1,
      label: '1h',
    },
    {
      value: 2,
      label: '2h',
    },
    {
      value: 3,
      label: '3h',
    },
    {
      value: 4,
      label: '4h',
    },
    {
      value: 5,
      label: '5h',
    },
    {
      value: 6,
      label: '6h',
    },
    {
      value: 7,
      label: '7h',
    },
  ];
  const SelectBackupAt = (props) => {
    const { onChange } = props;
    return (
      <ZSelect
        placeholder={''}
        {...props}
        name={'runAt'}
        selectMode={'single'}
        options={backupAtOptions}
        onChange={onChange}
      ></ZSelect>
    );
  };

  const freqOptions = [
    {
      value: 0,
      label: 'Day',
    },
    {
      value: 1,
      label: 'Week',
    },
  ];

  const SelectFreq = (props) => {
    const { onChange } = props;
    return (
      <ZSelect
        placeholder={''}
        {...props}
        name={'freq'}
        selectMode={'single'}
        options={freqOptions}
        onChange={onChange}
      ></ZSelect>
    );
  };

  const SelectType = (props) => {
    const { onChange } = props;
    return (
      <ZSelect
        placeholder={''}
        {...props}
        name={'backupType'}
        selectMode={'single'}
        options={typeOptions}
        onChange={onChange}
      ></ZSelect>
    );
  };

  const backupConfigFeldsSpec = [
    {
      name: 'backupType',
      label: 'Backup Type',
      initialValue: 0,
      rules: [
        {
          required: true,
          message: 'This field is required.',
        },
      ],
      Component: SelectType,
    },
    {
      name: 'freq',
      label: 'Backup every',
      initialValue: 0,
      rules: [
        {
          required: true,
          message: 'This field is required.',
        },
      ],
      Component: SelectFreq,
      dependOn: { name: 'backupType', value: 1 },
    },
    {
      name: 'runAt',
      label: 'At',
      initialValue: 0,
      rules: [
        {
          required: true,
          message: 'This field is required.',
        },
      ],
      Component: SelectBackupAt,
      dependOn: { name: 'backupType', value: 1 },
    },
  ];
  return (
    <ZForm
      name={'tableName'}
      ref={ref}
      fieldsSpec={backupConfigFeldsSpec}
    ></ZForm>
  )
})

export default BackupConfigForm;