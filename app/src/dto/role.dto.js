import { Input, InputNumber } from 'antd';
import ZSelect from '../core/components/zSelect';
import ZTreeSelect from '../core/components/zTreeSelect';

const statusMap = { false: 'InActive', true: 'Active' };

const statusOptions = [
  {
    value: false,
    label: 'InActive',
  },
  {
    value: true,
    label: 'Active',
  },
];

const typeOptions = [
  {
    value: 0,
    label: 'System Roles',
  },
  {
    value: 1,
    label: 'Project Roles',
  },
];


const SelectStatus = (props) => {
  const { onChange } = props;
  return (
    <ZSelect
      placeholder={''}
      selectMode={'single'}
      options={statusOptions}
      colormap={statusMap}
      onChange={onChange}
      {...props}
    ></ZSelect>
  );
};

const SelectType = (props) => {
  const { onChange } = props;
  return (
    <ZSelect
      placeholder={''}
      selectMode={'single'}
      options={typeOptions}
      // colormap={statusMap}
      onChange={onChange}
      {...props}
    ></ZSelect>
  );
};

const SelectPermissions = (props) => {
  const { onChange } = props;
  return (
    <ZTreeSelect
      datasource={'permissions'}
      valueField={'id'}
      tilteField={'name'}
      childrenField={'nodes'}
      onChange={onChange}
      {...props}
    ></ZTreeSelect>
  );
};

const editRoleFeldsSpec = [
  {
    name: 'id',
    label: 'Id',
    visible: 'false',
    Component: InputNumber,
  },
  {
    name: 'name',
    label: 'Role Name',
    rules: [
      {
        required: true,
        message: 'This field is required.',
        whitespace: true,
      },
    ],
    Component: Input,
  },
  {
    name: 'type',
    label: 'Type',
    initialValue: 0,
    rules: [
      {
        required: true,
        message: 'This field is required.',
        // whitespace: true,
      },
    ],
    Component: SelectType,
  },
  {
    name: 'active',
    label: 'Status',
    initialValue: true,
    rules: [
      {
        required: true,
        message: 'This field is required.',
        // whitespace: true,
      },
    ],
    Component: SelectStatus,
  },
  {
    name: 'permissions',
    label: 'Permissions',
    Component: SelectPermissions,
  },
];

const mapToDto = (ctx, values) => {
  const dto = new EditRoleDto(
    values['id'],
    values['name'],
    values['type'],
    values['active'],
    values['permissions']
  );
  return dto;
};

class EditRoleDto {
  constructor(id, name, type, active, permissions) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.active = active;
    this.permissions = permissions;
  }
}

export { editRoleFeldsSpec, mapToDto, EditRoleDto };
