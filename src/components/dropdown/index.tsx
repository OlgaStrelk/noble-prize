import React, { useState, useRef, FC } from 'react';
import cn from 'classnames';

import dropdown from '../../images/dropdown.svg';

import styles from './dropdown.module.css';

import { useClickOutside } from '../../services/dom';

const Dropdown: FC<{
  label: string;
  selected: string;
  options: ReadonlyArray<string>;
  handleOnSelect(value: string): void;
}> = ({ label, options, handleOnSelect, selected }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(menuRef.current, () => {
    setIsOpen(false);
  });

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const selectItem = (value: string) => {
    setIsOpen(false);
    handleOnSelect(value);
  };

  return (
    <div className={styles.container} ref={menuRef}>
      <div className={styles.selected_wrapper} onClick={openMenu}>
        <p className={styles.selected}>
          <span>{label} </span>({selected})
        </p>
        <img src={dropdown} alt="dropdown" />
      </div>
      <div className={cn(styles.menu, { [styles.menu__open]: isOpen })}>
        <ul className={styles.scroll_area} >
          {options.map(value => (
            <li
              key={value}
              onClick={() => selectItem(value)}
              className={cn(styles.option, {
                [styles.option__selected]: value === selected
              })}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;