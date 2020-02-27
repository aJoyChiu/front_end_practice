import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAppleAlt, faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import './appleHeader.css'

interface Props {
  tabList: Array<string>,
}

export default function AppleHeader({tabList}: Props) {
  return (
    <header className='header-nav'>
      <ul>
        <li className='nav-item icon'><FontAwesomeIcon icon={faAppleAlt} /></li>
        { tabList.map(tab => <li key={tab} className='nav-item'>{tab}</li>) }
        <li className='nav-item icon'><FontAwesomeIcon icon={faSearch} /></li>
        <li className='nav-item icon'><FontAwesomeIcon icon={faShoppingBag} /></li>
      </ul>
    </header>
  )
}
