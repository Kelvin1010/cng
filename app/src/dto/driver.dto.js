import { Input } from 'antd';

const createDriverFeldsSpec = [
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
    name: 'busySlots',
    label: 'Busy Slots',
    Component: Input,
  },
];

const mapToDto = (ctx, values) => {
  const dto = new CreateDriverDto(
    values['key'],
    ctx['creatorId'],
    values['name'],
    values['address'],
    values['email'],
    values['phone'],
    values['busySlots'],
  );
  return dto;
};

class CreateDriverDto {
  constructor(id, creatorId, name, address, email, phone, busySlots) {
    this.id = id;
    this.creatorId = creatorId;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.busySlots = busySlots;
  }
}

export { createDriverFeldsSpec, mapToDto, CreateDriverDto };
