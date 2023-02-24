import { Input, InputNumber } from 'antd';
import EntitySelect from '../core/components/entitySelect';
import ZSelect from '../core/components/zSelect';

const SelectDepartment = (props) => {
  const { onChange } = props;
  return (
    <EntitySelect
      {...props}
      source={'departments'}
      keyField={'id'}
      displayField={'name'}
      onSelect={onChange}
    ></EntitySelect>
  );
};

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

const roleOptions = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'user',
    label: 'User',
  },
];
const roleColorMap = { admin: 'red', user: 'green' };

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

const SelectRole = (props) => {
  const { onChange } = props;
  return (
    <EntitySelect
      {...props}
      source={'roles'}
      keyField={'id'}
      displayField={'name'}
      onSelect={onChange}
    ></EntitySelect>
  );
};

const editUserFeldsSpec = [
  {
    name: 'id',
    label: 'Id',
    visible: 'false',
    Component: InputNumber,
  },
  {
    name: 'username',
    label: 'Username',
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
    name: 'fullName',
    label: 'Full Name',
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
    name: 'email',
    label: 'Email',
    rules: [
      {
        required: true,
        message: 'This field is required.',
        whitespace: true,
      },
    ], // TODO
    Component: Input,
  },
  {
    name: 'phone',
    label: 'Phone',
    Component: Input,
  },
  {
    name: 'address',
    label: 'Address',
    Component: Input,
  },
  {
    name: 'active',
    label: 'Status',
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
    name: 'departmentId',
    label: 'Department',
    Component: SelectDepartment,
  },
  {
    name: 'roleId',
    label: 'Role',
    initialValue: 1,
    rules: [
      {
        required: true,
        message: 'This field is required.',
        // whitespace: true,
      },
    ],
    Component: SelectRole,
  },
];

const mapToDto = (ctx, values) => {
  const dto = new EditUserDto(
    values['id'],
    values['username'],
    values['email'],
    values['phone'],
    values['address'],
    values['fullName'],
    values['departmentId'],
    values['roleId'],
    values['active'],
  );
  return dto;
};

class EditUserDto {
  constructor(id, username, email, phone, address, fullName, departmentId, roleId, active) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.fullName = fullName;
    this.departmentId = departmentId;
    this.roleId = roleId;
    this.active = active;
  }
}

export { editUserFeldsSpec, mapToDto, EditUserDto };
