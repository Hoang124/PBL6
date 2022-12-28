import React, { useEffect } from 'react'
import headerAboutUs from '../../../assets/img/headerAboutUs.png'
import AboutUs1 from '../../../assets/img/AboutUs1.png'
import AboutUs2 from '../../../assets/img/AboutUs2.png'

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const headerStyle = {
        position: 'relative',
        content: '',
        height: '0px',
        width: '0px',
        left: '0px',
        borderWidth: '175px 1500px',
        borderStyle: 'solid',
        borderColor: '#9C57FF transparent transparent #9C57FF'
        // position: 'absolute',
        // width: '1440px',
        // height: '346.5px',
        // left: '0px',
        // top: '81.5px',

        // /* gradient */
        // background: 'linear-gradient(180deg, #7D89FF 0 %, #AB40FF 66.67 %)',
    }

    return (
        <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', padding: '10px 100px', left: '0px', zIndex: '1', backgroundColor: 'transparent', width: '100%', height: '350px' }}>
                <span className='text-white fs-1 fw-bold float-start mt-5'>About us</span>
                <img className='float-end mt-3 shadow rounded-3' src={headerAboutUs} alt="" />
            </div>
            <div style={headerStyle}>
            </div>
            <div className='d-flex justify-content-between' style={{ padding: '100px' }}>
                <div>
                    <span className='fs-1 fw-bold'>Profile</span>
                </div>
                <div>
                    <img className='shadow rounded-3' src={AboutUs1} alt="" />
                </div>
            </div>
            <div className='d-flex' style={{ padding: '100px' }}>
                <div>
                    <img className='me-5 shadow rounded-3' src={AboutUs2} alt="" />
                </div>
                <div>
                    <span className='ps-5 fs-1 fw-bold'>Our Mission</span>
                </div>
            </div>
        </div>
    )
}

export default AboutUs