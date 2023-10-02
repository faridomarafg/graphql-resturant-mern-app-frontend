import React from 'react'

const LineGrade = ({ width = "", bg='', h='', className }) => {
    return <div className={`${width} ${bg}  ${className}`} />;
};

export default LineGrade