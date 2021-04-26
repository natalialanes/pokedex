import React from 'react'
import { VscSearch } from 'react-icons/vsc'
import './search-bar.style.css'

const SearchBar = ({ onSearch }) => {
  return (
    <div className='search-bar'>
      <div className='search-icon'>
        <VscSearch size={20} />
      </div>
      <div className='text-input'>
        <input
          placeholder='Digite o nome de um pokemon'
          onChange={event => onSearch(event.target.value)}
          className='input-field'
          type='text'
        ></input>
      </div>
    </div>
  )
}
export { SearchBar }
