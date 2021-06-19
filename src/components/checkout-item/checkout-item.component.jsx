import React from 'react';
import { connect } from 'react-redux';

import './checkout-item.styles.scss';
import { addItem, removeItem, clearItemFromCart } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ item, addItem, removeItem, clearItem }) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={item.imageUrl} alt='item' />
        </div>
        <span className='name'>{item.name}</span>
        <span className='quantity'> 
            <div className='arrow' onClick={() => removeItem(item)}>&#10094;</div>
            <span className='value'>{item.quantity}</span>
            <div className='arrow' onClick={() => addItem(item)}>&#10095;</div>
        </span>
        <span className='price'>${item.price}</span>
        <div className='remove-button' onClick={() => clearItem(item)}>&#10005;</div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
	clearItem: item => dispatch(clearItemFromCart(item))
});


export default connect(null, mapDispatchToProps)(CheckoutItem);