import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

const Property = ({ property }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '55% 42%', columnGap: '5px' }}>
      <div style={{ gridColumnStart: 1, gridColumnEnd: 1 }}>
        <p>{property.name || property.Name.value}</p>
      </div>
      <div style={{ marginBottom: 2, gridColumnStart: 2, gridColumnEnd: 2}}>
        <TextArea value={property?.value != null ? property.value : property?.NominalValue?.value} autoSize={{ minRows: 1, maxRows: 5 }} disabled style={{color: 'black', cursor: 'default'}}></TextArea>
      </div>
    </div>
  )
}

export default Property;