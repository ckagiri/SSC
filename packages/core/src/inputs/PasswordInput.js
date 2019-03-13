import React, { useState } from 'react';
import VisibleIconOff from 'mdi-material-ui/EyeOff';
import VisibleIconOn from 'mdi-material-ui/Eye';
import { IconButton, InputAdornment } from '@material-ui/core';

import Input from './Input';
import AdornmentIcon from '../base/AdornmentIcon';

const PasswordInput = props => {
  const [visibility, setVisibilty] = useState(false);
  const VisibleIcon = () => (
    <AdornmentIcon
      onMouseDown={() => setVisibilty(!visibility)}
      icon={visibility ? VisibleIconOff : VisibleIconOn}
      size="default"
    />
  );
  return (
    <Input
      label="Mật khẩu"
      type={visibility ? 'text' : 'password'}
      endAdornment={<VisibleIcon />}
      {...props}
    />
  );
};

export default PasswordInput;
