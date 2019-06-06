import React from 'react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import './NestedList.css'

const NestedList = ({ list }) => (
  <ul>
    {list.map(el => {
      if (el.children)
        return (
          <Fragment>
            <li className="Nested-list-li">{el.title}</li>
            <NestedList list={el.children} />
          </Fragment>
        );
      return <li className="Nested-list-li">{el.title}</li>;
    })}
  </ul>
);
NestedList.propTypes = {
  list: PropTypes.array.isRequired,
}

export default NestedList;