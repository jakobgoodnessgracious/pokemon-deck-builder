import { useState } from 'react';
import ConditionalWrapper from '../ConditionalWrapper';
// import './Nav.scss';
import styles from './Nav.module.scss';

const Nav = ({
  containerClassName,
  colClassName,
  textClassName,
  activeTextClassName,
  activeContainerClassName,
  defaultActiveTabIndex,
  tabs,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultActiveTabIndex);

  return (
    <div className={containerClassName}>
      {tabs.map((tab, index) => {
        const { label } = tab;
        const isActiveTab = activeTabIndex === index;
        return (
          <div className={colClassName} key={'nav-col' + index}>
            <div key={'active-' + index} className={activeContainerClassName}>
              <div
                key={index}
                onClick={() => setActiveTabIndex(index)}
                className={isActiveTab ? activeTextClassName : textClassName}
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
  containerClassName: 'row lh-1 ps-2 pe-2 fs-4',
  colClassName: 'col-2',
  textClassName: 'text-white pb-2 pe-2 ' + styles.inactiveBorder,
  activeContainerClassName: 'd-flex justify-content-end',
  activeTextClassName: 'text-white pb-2 pe-2 ' + styles.activeBorder,
  defaultActiveTabIndex: 0,
  tabs: [],
};

export default Nav;
