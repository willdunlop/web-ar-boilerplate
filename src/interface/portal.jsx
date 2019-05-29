import React, { Component } from 'react';
import PropTypes from 'prop-types';

import constants from '../config/constants';

class Portal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalOpen: true,
        };

        this.togglePortal = this.togglePortal.bind(this);
    }

    togglePortal() {
        this.setState({ portalOpen: !this.state.portalOpen });
    }

    setActiveProduct(product) {
        constants.product.active = product;
        this.props.updateProduct();
    }

    render() {
        const { portalOpen } = this.state;
        return (
            <div className={`portal__container  ${portalOpen ? 'portal__container--open' : 'portal__container--closed' }`}>
                <div className="portal">
                    {Object.keys(constants.assets).map(key => {
                        return (
                            <button 
                                key={key}
                                className={`portal__product ${this.props.product.name === constants.assets[key].name ? 'portal__product--active' : '' }`} 
                                onClick={() => this.setActiveProduct(constants.assets[key])}
                            >
                                <img className="portal__product-img" src={constants.assets[key].thumbnail} />
                            </button>
                        );
                    })}
                </div>

                <button className="portal__toggle" onClick={this.togglePortal}>
                    {portalOpen ? "<" : ">"}
                </button>
            </div>
        
        );
    }
}

Portal.propTypes = {
    updateProduct: PropTypes.func,
    product: PropTypes.object
};


export default Portal;