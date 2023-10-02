import {AiFillHeart} from 'react-icons/ai'
import {useDispatch} from 'react-redux';
import { addToCart } from '../features/wishListSlice';

const AddToWishListBtn = ({food,className}) => {
    const dispatch = useDispatch();

    const handleAddToWishList = ()=>{
        dispatch(addToCart(food));
    };

  return (
    <div>
        <AiFillHeart 
        className={`${className}`}
         onClick={handleAddToWishList}
        />
    </div>
  )
}

export default AddToWishListBtn