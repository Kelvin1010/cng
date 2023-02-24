import PropertySet from "./propertySet";

const PropertyGrid = ({ PropertySets }) => {
  return (
    <>
      {PropertySets.map(
        (ps) => {
          return (
            <PropertySet key={ps.name || ps.Name.value} propertySet={ps}></PropertySet>
          )
        }
      )
      }
    </>
  )
}

export default PropertyGrid;