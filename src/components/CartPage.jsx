import React from 'react'
import PropTypes from 'prop-types';
import '../CartPage.css';
import Item from './Item';

function CartPage({items, onAddOne, onRemoveOne}) {
  return (
    <ul className="CartPage-items">
      {items.map((item) =>
        <li key={item.id} className="CartPage-item">
          {item.title}
          <Item item={item}>
          <div className="Item-controls">
                <button
                  className="CartItem-removeOne"
                  onClick={() => onRemoveOne(item)}
                >
                  -
                </button>
                <span className="Item-quantity-box">
                  <span className="CartItem-count">{item.count}</span>
                </span>
                <button className="CartItem-addOne" onClick={() => onAddOne(item)}>
                  +
                </button>
              </div>
          </Item>

        </li>)}


        </ul>
  );
}

CartPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired
};

export default CartPage