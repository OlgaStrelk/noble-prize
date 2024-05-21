import { FC } from 'react';
import styles from './input.module.css';

export type TInputProps = {
  onIconClick?: () => void;
  icon?: React.ElementType;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<TInputProps> = ({
  icon: Icon,
  onIconClick,
  value,
  placeholder,
  onChange,
  type,
  ...props
}) => {
  const icon = Icon ? <Icon onClick={onIconClick} className={styles.inputContainer} /> : null;
  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      {icon}
    </div>
  );
};