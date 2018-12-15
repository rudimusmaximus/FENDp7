import React from 'react';
import PropTypes from 'prop-types';
import Listing from './Listing';

function List(props){
    console.log(`props are `, props);
    return (
        <div className="list">
            {props.filteredTips.map(l =>
                <Listing
                    key={l.short_name_key}
                    name={l.location_name}
                    onFilteredTipListItemClick={
                        props.onFilteredTipListItemClick}

                />)}
        </div>
    );
}

List.propTypes = {
    filteredTips: PropTypes.array.isRequired,
    onFilteredTipListItemClick: PropTypes.func.isRequired
};

export default List;
