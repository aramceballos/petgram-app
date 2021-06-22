import React from 'react';

import { TouchableOpacity, Image } from './styles';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <TouchableOpacity>
      <Image source={logo} />
    </TouchableOpacity>
  );
};

export default Header;
