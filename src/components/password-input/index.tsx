import {FC, useState} from 'react';
import { Input, TInputProps } from '../input';
import eyeOff from '../../images/eye-off.svg';
import eye from '../../images/eye.svg';

const EyeOff: FC<{ onClick: () => void }> = props => <img src={eyeOff} alt="eye-off" onClick={props.onClick} />;
const Eye: FC<{ onClick: () => void }> = props => <img src={eye} alt="eye-off" onClick={props.onClick} />;

export const PasswordInput: FC<TInputProps> = ({ type, ...props }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={isVisible ? 'text' : 'password'}
      icon={isVisible ? EyeOff : Eye}
      onIconClick={() => setVisible(!isVisible)}
    />
  );
};