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

const createVehicleFeldsSpec = [
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
    name: 'capacity',
    label: 'Capacity',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: Input,
  },
  {
    name: 'type',
    label: 'Type',
    Component: Input,
  },
  {
    name: 'busySlots',
    label: 'Busy Slots',
    Component: Input,
  },
  {
    name: 'pointId',
    label: 'Location',
    Component: SelectPoint,
  },
];

const mapToDto = (ctx, values) => {
  const dto = new CreateVehicleDto(
    values['key'],
    ctx['creatorId'],
    values['name'],
    values['capacity'],
    values['type'],
    values['busySlots'],
    values['pointId'],
  );
  return dto;
};

class CreateVehicleDto {
  constructor(id, creatorId, name, capacity, type, busySlots, pointId) {
    this.id = id;
    this.creatorId = creatorId;
    this.name = name;
    this.capacity = capacity;
    this.type = type;
    this.busySlots = busySlots;
    this.pointId = pointId;
  }
}

export { createVehicleFeldsSpec, mapToDto, CreateVehicleDto };
