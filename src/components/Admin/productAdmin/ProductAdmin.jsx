import React, { Fragment } from 'react'
import TableViewAdmin from '../tableViewAdmin/TableViewAdmin'

const ProductAdmin = () => {
  const tableHeader = ['Number', 'Id', 'Name', 'Price', 'Action'];
  const selectedSort = ['One', 'Two', '3']
  const ListItem = [{id:1, Name:'Ao', Price:1000}, {id:2, Name:'Ao', Price:2000}, {id:3, Name:'Ao', Price:3000}];
  return (
    <Fragment>
      <TableViewAdmin header={'Product'} tableHeader={tableHeader} tableContent={ListItem} selectedSort={selectedSort}/>
    </Fragment>
  )
}

export default ProductAdmin