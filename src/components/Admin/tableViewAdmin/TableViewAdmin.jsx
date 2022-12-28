import React, { useState } from 'react'
import PropsType from 'prop-types'

// TableViewAdmin.propTypes = {

// }

// PropsType.default = {

// }

const TableViewAdmin = (props) => {
    const [selectedSort, setSeletedSort] = useState('1')
    const [Search, setSearch] = useState('')
    var color_main = 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)';

    function handleChangeSelectedSort(e){
        setSeletedSort(e.target.value)
    }


    function handleSearch(e){
        setSearch(e.target.value)
    }

    return (
        <div className='col-10 py-3 px-5'>
            <h1 className="header text-uppercase">
                {props.header}
            </h1>
            <div className='d-flex justify-content-between'>
                <div className='d-flex justify-content-between w-50'>
                    <input type="text" className='form-control' value={Search} onChange={handleSearch} style={{ width: '300px' }} placeholder='Search' />
                    <select className="form-select form-select-sm h-75" style={{ width: '100px' }}
                        value={selectedSort} onChange={handleChangeSelectedSort} aria-label=".form-select-sm example">
                        {/* <option selected>sort by</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option> */}
                        {props.selectedSort.map((selectValue, index) => (<option key={index} value={selectValue}>{selectValue}</option>))}
                    </select>
                </div>
                <button className='btn btn-primary' style={{ color: color_main }}>+Add</button>
            </div>
            <div>
                <table className="table table-bordered my-3 rounded-2">
                    <thead>
                        <tr>
                            {props.tableHeader.map((element, index) => (<th key={index} scope="col">{element}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {props.tableContent.map((Item, index) => (
                            <tr key={Item.id}>
                                <th scope="row">{index}</th>
                                <td>{Item.id}</td>
                                <td>{Item.Name}</td>
                                <td>{Item.Price}</td>
                                <td>
                                    <button className='btn btn-primary me-2'>Edit</button>
                                    <button className='btn btn-primary'>Update</button>
                                </td>
                            </tr>
                        ))}
                                {/* <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>
                                <button className='btn btn-primary me-2'>Edit</button>
                                <button className='btn btn-primary'>Update</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>
                                <button className='btn btn-primary me-2'>Edit</button>
                                <button className='btn btn-primary'>Update</button>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableViewAdmin