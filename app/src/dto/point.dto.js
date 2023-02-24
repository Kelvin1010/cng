import { Input } from 'antd';

const createPointFeldsSpec = [
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
    name: 'lon',
    label: 'Lon',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: Input,
  },
  {
    name: 'lat',
    label: 'Lat',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: Input,
  },
];

const mapToDto = (ctx, values) => {
  const dto = new CreatePointDto(
    values['key'],
    ctx['creatorId'],
    values['name'],
    values['lon'],
    values['lat'],
  );
  return dto;
};

class CreatePointDto {
  constructor(id, creatorId, name, lon, lat) {
    this.id = id;
    this.creatorId = creatorId;
    this.name = name;
    this.lon = lon;
    this.lat = lat;
  }
}

export { createPointFeldsSpec, mapToDto, CreatePointDto };
