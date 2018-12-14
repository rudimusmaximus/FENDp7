import React from "react";
import PropTypes from "prop-types";
import shortid from 'shortid';

// /**
//  *
//  */
// function handleListItemClick(e) {
//     console.log(`handleListItemClick from Listing.js stateless function called`);
//     props.onFilteredTipListItemClick(e.target.value);
// }

function Listing(props){
    return (
        <li className="listing" key={shortid.generate()}
            onClick={props.onFilteredTipListItemClick(props.name)}
        >{props.name}</li>
    );
}

Listing.propTypes = {
    name: PropTypes.string.isRequired
};

export default Listing;
