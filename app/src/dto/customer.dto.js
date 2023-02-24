import { Input } from 'antd';
import EntitySelect from '../core/components/entitySelect';

const SelectPoint = (props) => {
  const { onChange, value } = props;
  return (
    <EntitySelect
      {...props}
      mode="single"
      source={'points'}
      keyField={'id'}
      displayField={'name'}
      onSelect={onChange}
    ></EntitySelect>
  );
};

const createCustomerFeldsSpec = [
  {
    name: 'key',
    label: 'key',
    Component: Input,
    visible: 'false',
  },
  {
    name: 'name',
    label: 'Name',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: Input,
  },
  {
    name: 'address',
    label: 'Address',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: Input,
  },
  {
    name: 'email',
    label: 'Email',
    Component: Input,
  },
  {
    name: 'phone',
    label: 'Phone',
    Component: Input,
  },
  {
    name: 'pointId',
    label: 'Location',
    Component: SelectPoint,
  },
];

const mapToDto = (ctx, values) => {
  const dto = new CreateCustomerDto(
    values['key'],
    ctx['creatorId'],
    values['name'],
    values['address'],
    values['email'],
    values['phone'],
    values['pointId'],
  );
  return dto;
};

class CreateCustomerDto {
  constructor(id, creatorId, name, address, email, phone, pointId) {
    this.id = id;
    this.creatorId = creatorId;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.pointId = pointId;
  }
}

export { createCustomerFeldsSpec, mapToDto, CreateCustomerDto };
