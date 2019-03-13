import React from 'react';

import NumberInput from './NumberInput';

const HeightInput = ({ ...props }) => <NumberInput endAdornment="cm" {...props} />;

export default HeightInput;
