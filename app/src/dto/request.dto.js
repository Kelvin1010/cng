import { Input, InputNumber, DatePicker } from 'antd';
import moment from 'moment';
import EntitySelect from '../core/components/entitySelect';
import FileUpload from '../core/components/fileUpload';
import ZSelect from '../core/components/zSelect';

const { TextArea } = Input;

const TimePicker = (props) => {
  const { onChange, value } = props;
  return (
    <DatePicker
      // {...props}
      style={{ width: '100%' }}
      format="DD-MM-YYYY HH:mm" // HH:mm:ss
      // disabledDate={disabledDate}
      // disabledTime={disabledDateTime}
      // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
      value={value ? moment(value) : undefined}
      onChange={onChange}
      getPopupContainer={(triggerNode) => {
        return triggerNode.parentNode;
      }}
    />
  );
};

const SelectCustomer = (props) => {
  const { onChange } = props;
  return (
    <EntitySelect
      {...props}
      source={'customers'}
      keyField={'id'}
      displayField={'name'}
      onSelect={onChange}
    ></EntitySelect>
  );
};


const createRequestFeldsSpec = [
  {
    name: 'key',
    label: 'key',
    Component: Input,
    visible: 'false',
  },
  {
    name: 'customerId',
    label: 'Customer',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: SelectCustomer,
  },
  {
    name: 'demand',
    label: 'Demand',
    rules: [
      {
        required: true,
        message: 'This field is required.',
      },
    ],
    Component: InputNumber,
  },
  {
    name: 'erliestTime',
    label: 'Erliest Time',
    Component: TimePicker,
  },
  {
    name: 'latestTime',
    label: 'Latest Time',
    Component: TimePicker,
  },
  {
    name: 'requestTime',
    label: 'Request Time',
    Component: TimePicker,
  },
];

const mapToDto = (ctx, values) => {
  const dto = new CreateRequestDto(
    values['key'],
    ctx['creatorId'],
    values['customerId'],
    values['demand'],
    values['erliestTime'],
    values['latestTime'],
    values['requestTime'],
  );
  return dto;
};

class CreateRequestDto {
  constructor(id, creatorId, customerId, demand, erliestTime, latestTime, requestTime) {
    this.id = id;
    this.creatorId = creatorId;
    this.customerId = customerId;
    this.demand = demand;
    this.erliestTime = erliestTime;
    this.latestTime = latestTime;
    this.requestTime = requestTime;
  }
}

export { createRequestFeldsSpec, mapToDto, CreateRequestDto };
