import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
    return (
        <div className="col-xl-3 col-md-6 col-sm-12 mt-4" style={{ height: '400px' }}>
            <div className='card-item h-100 card shadow'>
                <Skeleton height={0.6*400} />

                <div>
                    <h6 className='mt-2'><Skeleton count={1} height={28} /></h6>
                    <h6 className='mt-4'><Skeleton count={1} height={20} /></h6>
                    <h6 className='mt-4'><Skeleton count={1} /></h6>

                </div>
            </div>
        </div>

    )
}

export default CardSkeleton