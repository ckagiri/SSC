import React, { useState } from 'react';
import { useField } from '@ssc/core';

import CityFieldInput from './CityFieldInput';
import TownFieldInput from './TownFieldInput';

const LocalFieldInput = props => {
  const {
    form: { setFieldValue, setFieldTouched },
    name,
    required,
  } = useField(props);

  const [city, setCity] = useState();
  const [inputValue, setInputValue] = useState('');
  const handleCityChange = newCity => {
    if (!city || city.name !== (newCity && newCity.name)) {
      setCity(newCity);
      setFieldValue('city', newCity && newCity.name);
      setFieldTouched('city');
      setFieldValue('town', undefined);
      setInputValue('');
    }
  };

  return (
    <React.Fragment>
      <CityFieldInput
        name="city"
        parent={name}
        onChange={handleCityChange}
        value={city}
        required={required}
      />
      <TownFieldInput
        cityName={city && city.name}
        disabled={!city}
        itemToValue={town => town && town.name}
        inputValue={inputValue}
        onInputValueChange={v => setInputValue(v || '')}
        onSelect={i => setInputValue((i && i.name) || '')}
        label="Town"
        name="town"
        rowHeight={48}
        parent={name}
        required={required}
      />
    </React.Fragment>
  );
};

export default LocalFieldInput;
