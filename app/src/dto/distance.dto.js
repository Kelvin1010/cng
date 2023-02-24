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

const createDistanceFeldsSpec = [
  {
    name: 'key',
    label: 'key',
    Component: Input,
    visible: 'false',
  },
  {
    name: 'fromPointId',
    label: 'From',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: SelectPoint,
  },
  {
    name: 'toPointId',
    label: 'To',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: SelectPoint,
  },
  {
    name: 'length',
    label: 'Length',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: InputNumber,
  },
  {
    name: 'timeToTravel',
    label: 'Time to Travel',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: InputNumber,
  },
];

const mapToDto = (ctx, values) => {
  const dto = new CreateDistanceDto(
    values['key'],
    ctx['creatorId'],
    values['fromPointId'],
    values['toPointId'],
    values['length'],
    values['timeToTravel'],
  );
  return dto;
};

class CreateDistanceDto {
  constructor(id, creatorId, fromPointId, toPointId, length, timeToTravel) {
    this.id = id;
    this.creatorId = creatorId;
    this.fromPointId = fromPointId;
    this.toPointId = toPointId;
    this.length = length;
    this.timeToTravel = timeToTravel;
  }
}

export { createDistanceFeldsSpec, mapToDto, CreateDistanceDto };
