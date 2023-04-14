import { useState } from 'react';
// import './Nav.scss';
import styles from './Nav.module.scss';
import { cls } from '../../pages/utils';

const Nav = ({
  navContainerClassName,
  tabContainerClassName,
  textClassName,
  activeTextClassName,
  textContainerClassName,
  defaultActiveTabIndex,
  tabs,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultActiveTabIndex);

  return (
    <div className={navContainerClassName}>
      {tabs.map((tab, index) => {
        const {
          label,
          activeTextClassName: localActiveTextClassName,
          tabContainerClassName: localTabContainerClassName,
          textContainerClassName: localTextContainerClassName,
        } = tab;
        const isActiveTab = activeTabIndex === index;
        return (
          <div
            className={localTabContainerClassName || tabContainerClassName}
            key={'nav-col' + index}
          >
            <div
              key={'active-' + index}
              className={localTextContainerClassName || textContainerClassName}
            >
              <div
                key={index}
                onClick={() => setActiveTabIndex(index)}
                className={cls(
                  'cursor-pointer',
                  isActiveTab
                    ? localActiveTextClassName || activeTextClassName
                    : textClassName
                )}
              >
                {label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Nav.defaultProps = {
  navContainerClassName: 'd-flex justify-content-between lh-1',
  tabContainerClassName: '',
  textClassName: cls('text-white pb-2 pe-2', styles.borderBase),
  textContainerClassName: 'justify-content-end',
  activeTextClassName: cls(
    'text-white pb-2 pe-2',
    styles.borderBase,
    styles.activeBorder
  ),
  defaultActiveTabIndex: 0,
  tabs: [],
};

export default Nav;
