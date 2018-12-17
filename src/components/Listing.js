import React from "react";
import PropTypes from "prop-types";
import shortid from 'shortid';

function Listing(props){
    return (
        <div className="listing"
            key={shortid.generate()}
            onClick={(e) => {props.onFilteredTipListItemClick(props.name, e);}}
        >{props.name}</div>
    );
}

Listing.propTypes = {
    name: PropTypes.string.isRequired,
    onFilteredTipListItemClick: PropTypes.func.isRequired
};

export default Listing;
