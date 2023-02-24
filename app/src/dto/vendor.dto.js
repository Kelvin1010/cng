import { Input, InputNumber } from 'antd';
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

const createVendorFeldsSpec = [
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
  {
    name: 'avgProductivity',
    label: 'avgProductivity',
    Component: InputNumber,
  },
  {
    name: 'maxVehiclePerTime',
    label: 'maxVehiclePerTime',
    Component: InputNumber,
  },
  {
    name: 'avgLoadingTimePerVehicle',
    label: 'avgLoadingTimePerVehicle',
    Component: InputNumber,
  },
  {
    name: 'avgLoadingTimePerM3',
    label: 'avgLoadingTimePerM3',
    Component: InputNumber,
  },
];

const mapToDto = (ctx, values) => {
  const dto = new CreateVendorDto(
    values['key'],
    ctx['creatorId'],
    values['name'],
    values['address'],
    values['email'],
    values['phone'],
    values['pointId'],
    values['avgProductivity'],
    values['maxVehiclePerTime'],
    values['avgLoadingTimePerVehicle'],
    values['avgLoadingTimePerM3'],
  );
  return dto;
};

class CreateVendorDto {
  constructor(id, creatorId, name, address, email, phone, pointId, avgProductivity, maxVehiclePerTime, avgLoadingTimePerVehicle, avgLoadingTimePerM3) {
    this.id = id;
    this.creatorId = creatorId;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.pointId = pointId;
    this.avgProductivity = avgProductivity;
    this.maxVehiclePerTime = maxVehiclePerTime;
    this.avgLoadingTimePerVehicle = avgLoadingTimePerVehicle;
    this.avgLoadingTimePerM3 = avgLoadingTimePerM3;
  }
}

export { createVendorFeldsSpec, mapToDto, CreateVendorDto };
