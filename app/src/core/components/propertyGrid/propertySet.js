import Property from "./property";

const PropertySet = ({ propertySet }) => {
  if (propertySet && (propertySet.properties || propertySet.HasProperties))
    return (
      <>
        <p style={{ fontWeight: 'bold' }}>{propertySet.name || propertySet.Name.value}</p>
        {(propertySet.properties || propertySet.HasProperties).map((p) => {
          return (
            <Property key={p.name || p.Name.value} property={p}></Property>
          )
        })}
      </>
    )
  else
    return (<></>)
}

export default PropertySet;