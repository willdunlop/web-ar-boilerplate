import React, { Component } from 'react';
import PropTypes from 'prop-types';

import constants from '../config/constants';

class ColorPortal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalOpen: false,
            // activeColor: this.props.product.activeColor,
        };

        this.togglePortal = this.togglePortal.bind(this);
    }

    togglePortal() {
        this.setState({ portalOpen: !this.state.portalOpen });
    }

    setActiveColor(color) {
        constants.product.active.activeColor = color;
        this.props.updateProduct();
        // this.setState({ activeColor: color });
    }
    
    /**
     * TODO:
     * Using constants is not an effective way for react to detect changes.
     * An event that listens for change will have to occur high up in the 
     * component heiarchy. the props will then be uses to detect change 
     * Alternatively, you could use redux
     */
    render() {
        const { portalOpen } = this.state;
        const classList = [
            'color-portal__container',
            portalOpen ? 'color-portal__container--open' : 'color-portal__container--closed',
        ];
        return (
            <div className={classList.join(' ')}>

                <button className="color-portal__toggle" onClick={this.togglePortal}>
                    {portalOpen ? ">" : "<"}
                </button>

                <div className="color-portal">
                    {Object.keys(this.props.product.colors).map(key => {
                        return (
                            <button 
                            key={key}
                            className={`color-portal__product ${this.props.product.activeColor === key ? 'color-portal__product--active' : '' }`} 
                            onClick={() => this.setActiveColor(key)}>
                                <div className="color-portal__product-title">{key}</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        
        );
    }
}

ColorPortal.propTypes = {
    updateProduct: PropTypes.func,
    product: PropTypes.object
};

export default ColorPortal;