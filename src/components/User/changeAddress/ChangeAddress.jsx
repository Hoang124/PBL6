import React, { useEffect, useState } from 'react'
import axios from '../../../api/axios';
import Address from '../address/Address';

const ChangeAddress = () => {

    const [infoAddress, setInforAddress] = useState([])

    useEffect(() => {
        const getAddress = async () => {
            const getAddressURL = '/api/v1/web/inforaddress'
            const accessToken = localStorage.getItem('token')
            try {
                const respone = await axios.get(getAddressURL,
                    {
                        headers: {
                            token: accessToken
                        }
                    }
                );
                setInforAddress([...respone.data.inforAddress])
            } catch (error) {
                console.log(error);
            }
        }

        getAddress()
    }, [])
    
    console.log(infoAddress)

    return (
        <div>
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white'}}>
                Change
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">My address</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body mx-3">
                            {
                                infoAddress.map(add => <Address address={add}/>)
                            }
                            {/* <div>
                                <button className='btn btn-primary my-2'>Add new address</button>
                            </div> */}
                        </div>
                        <div class="modal-footer">
                            {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button> */}
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeAddress