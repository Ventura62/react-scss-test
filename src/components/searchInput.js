import React from "react";

import { Spinner } from "reactstrap";

import { Search } from "src/assets/svg";

const SearchInput = () => {

  const seachResults = []
  const isLoading = false;

  return(
    <div className="search--input"> 
      <div className="seach--text--input">
        <Search/>
        <input
          type="text"
          placeholder="Search Clients..."/>
      </div>
      <div className="search--results">
        {isLoading && (
          <div className="item--result loading">
            <Spinner size="sm"/>
          </div>
        )}
        {seachResults && seachResults.length > 0 && seachResults.map((result, i)=>(
          <div key={i} className="item--result">
            {result.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchInput