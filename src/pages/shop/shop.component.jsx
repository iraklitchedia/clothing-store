import React from 'react';

//import './homepage.styles.scss';
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }
    render() {
        return (
            <div className='shop-page'>
                {
                    this.state.collections.map(({ id, ...collectionProps })=> (
                        <CollectionPreview key={id} {...collectionProps} />
                    ))
                }
            </div>
        );
    }
}

export default ShopPage;