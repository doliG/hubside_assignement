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
            <li key={el.id} className="Nested-list-li">{el.title}</li>
            <NestedList list={el.children} />
          </Fragment>
        );
      return <li key={el.id} className="Nested-list-li">{el.title}</li>;
    })}
  </ul>
);
NestedList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      children: PropTypes.array,
    })
  ),
}

export default NestedList;