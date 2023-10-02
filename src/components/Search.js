import { useQuery, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setResults } from '../features/searchSlice';

function Search({toggleHandler}) {
    const dispatch = useDispatch();
    const { data } = useQuery(GET_FOODS);
    const foods = data?.getFoods;
  
    const [selectedFilter, setSelectedFilter] = useState('Foods'); // Default to 'Food'
    const [filteredData, setFilteredData] = useState();
    
    useEffect(() => {
        const filteredData = foods?.filter((food)=> food.category === selectedFilter);
        setFilteredData(filteredData);
    }, [foods, selectedFilter]);
    
    useEffect(() => {
        dispatch(setResults(filteredData));
    }, [filteredData, dispatch]);

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
    };

    return (
        <div className='flex relative' onClick={toggleHandler}>
            <div className='flex flex-col sm:flex-row  w-full justify-center gap-4'>
                <button onClick={() => handleFilterClick('Foods')} 
                className={`${selectedFilter === 'Foods' ? 
                ' text-[17px]  border-b-2 border-b-slate-300 text-yellow-500 font-semibold' : 
                ' text-[17px]  border-b-2 border-b-slate-300 font-semibold'}`}>
                    Foods
                </button>
                <button onClick={() => handleFilterClick('Beverages')} 
                    className={`${selectedFilter === 'Beverages' ? 
                    ' text-[17px]  border-b-2 border-b-slate-300 text-yellow-500 font-semibold' : 
                    ' text-[17px]  border-b-2 border-b-slate-300 font-semibold'}`}
                    >
                    Beverages
                </button>
                <button onClick={() => handleFilterClick('Breakfasts')} 
                    className={`${selectedFilter === 'Breakfasts' ? 
                    ' text-[17px]  border-b-2 border-b-slate-300 text-yellow-500 font-semibold' : 
                    ' text-[17px]  border-b-2 border-b-slate-300 font-semibold'}`}
                    >
                    Breakfasts
                </button>
                <button onClick={() => handleFilterClick('Desserts')} 
                    className={`${selectedFilter === 'Desserts' ? 
                    ' text-[17px]  border-b-2 border-b-slate-300 text-yellow-500 font-semibold' : 
                    ' text-[17px]  border-b-2 border-b-slate-300 font-semibold'}`}
                    >
                    Desserts
                </button>
            </div>
        </div>
    )
}

export default Search;

const GET_FOODS = gql`
  query GetFoods {
    getFoods {
    id
    name
    price
    category
    ingredients
    description
    isVege
    isSpicy
    images
    }
  }
`;