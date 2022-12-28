import React from 'react'

const Address = (props) => {
    const address = {...props.address}
    return (
        <div className='py-3 border-bottom border-muted'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                    <div className='pe-2 border-end border-dark'>
                        {address.name}
                    </div>
                    <div className='px-2 text-muted'>
                        {address.phone}
                    </div>
                </div>
                {/* <div>
                    Edit
                </div> */}
            </div>
            <div className='text-start'>
                <div >
                    {address.address.street}
                </div>
                <div>
                    <span className='pe-2'>{address.address.id_commune.name}</span>
                    <span className='pe-2'>{address.address.id_district.name}</span>
                    <span>{address.address.id_province.name}</span>
                </div>
            </div>
            {address.role ? <div className='me-3 border border-danger text-danger' style={{ fontSize: '12px', height: '22px', width: 'fit-content' }}>Default</div>: ''}
        </div>
    )
}

export default Address