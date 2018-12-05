import React from "react";
import PropTypes from "prop-types";
import shortid from 'shortid';

function Listing(props){
    return (
        <li className="listing" key={shortid.generate()}>{props.name}</li>
    );
}

Listing.propTypes = {
    name: PropTypes.string.isRequired
};

export default Listing;
