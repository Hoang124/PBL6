import React from 'react'
import ReactPaginate from 'react-paginate';


const Pagination = (props) => {

    const { pagination, handlePageChange } = props

    const handlePageClick = (event) => {
        if(handlePageChange){
            handlePageChange(event.selected + 1)
        }
    };

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pagination.count}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName='pagination justify-content-center my-5'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                activeClassName='active'
            />
        </>
    );
}

export default Pagination