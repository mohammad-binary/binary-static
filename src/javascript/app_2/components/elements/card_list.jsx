import React from 'react';
import PropTypes from 'prop-types';

const CardList = ({ data_source, Card }) => (
    <div className='card-list'>
        {
            data_source.map((transaction, id) => (
                <Card className='card-list__card' {...transaction} key={id} />
            ))
        }
    </div>
);

CardList.propTypes = {
    Card       : PropTypes.func,
    data_source: PropTypes.array,
};

export default CardList;
