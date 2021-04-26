import React from 'react'
import './pagination.style.css'

const Pagination = ({ pageNumbers = 10, selectedNumber, onPageSelection }) => {
  const pages = [...Array(pageNumbers).keys()]
  return (
    <div className='pagination'>
      <div className='page-selector'>
        {pages.map((page, key) => {
          return (
            <div
              key={key}
              onClick={() => onPageSelection(key)}
              className={
                selectedNumber === key + 1 ? 'selected-number' : 'page-number'
              }
            >
              {page + 1}
            </div>
          )
        })}
      </div>
      <div className='current-page'>
        Página {selectedNumber} de {pageNumbers}
      </div>
    </div>
  )
}

export { Pagination }
