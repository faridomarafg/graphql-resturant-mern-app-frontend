
import {useMutation} from '@apollo/client';
import { CREATE_FOOD, GET_FOODS, GET_FOOD, EDIT_FOOD } from '../../graphql/foodQuaries';
import { useState, useRef } from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';

const initialState={
  name:"",
  description:"",
  category:"",
  images:[],
  price:0,
  ingredients:[],
  isSpicy:false,
  isVege:false
};



const CreateFood = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState();
  const {name, description, category, images, price, ingredients, isVege, isSpicy} = formData;
  const {id} = useParams();
  
  //find sigleFoodObject to do the update process;
  const {data} = useQuery(GET_FOOD,{
    variables:{id}
  });

  const singleFoodObject = data?.getFood;
  //===================

  useEffect(() => {
    if (id && singleFoodObject && singleFoodObject.ingredients) {//check for ingredients because when refresh the page it lose the state, for that we should check for it, else it will case error;
      setFormData({
        ...singleFoodObject
      });
    }
  }, [id, singleFoodObject]);

  const onChangeHandler = (e)=>{
    const { name, value, type, checked } = e.target;

    // Use the `type` property to differentiate between regular inputs and checkboxes
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({ ...formData, [name]: newValue });
  };


  const onIngredientsChange = (e) => {
    const { name, value } = e.target;

    // Split the input value by a comma to get an array of ingredients
    const ingredientArray = value.split(',');

    setFormData({ ...formData, [name]: ingredientArray });
  };

  const onKeyUpHandler = (e) => {
    // If the backspace key is pressed and the current input is empty
    if (e.key === 'Backspace' && e.target.value === '') {
      // Move focus to the previous input field for ingredients
      const currentIndex = ingredients.indexOf(e.target.name);
      if (currentIndex > 0) {
        const previousIngredientInput = document.getElementsByName(
          ingredients[currentIndex - 1]
        )[0];
        if (previousIngredientInput) {
          previousIngredientInput.focus();
        }
      }
    }
  };


  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        newImages.push(event.target.result);
        if (i === files.length - 1) {
          setFormData({ ...formData, images: [...images, ...newImages] });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = ()=>{
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = (imageIndexToRemove)=>{
     const updatedImages = images.filter((_,index)=> index !== imageIndexToRemove);
     setFormData({...formData, images: updatedImages});
  };

  const parsedPrice = parseInt(price);// use it to make change the price type into integer;
   useQuery(GET_FOODS) ;// use it to make the food-object display in home page without refreshing; 

  const [createFood,{loading}] = useMutation(CREATE_FOOD,{
     update(proxy, result){
       const data = proxy.readQuery({// read the existing data from cache
        query: GET_FOODS
       });
       
       console.log(data);
       proxy.writeQuery({//it updates the cache by adding the newly created food object to the beginning of the getFoods array 
          query:GET_FOODS,
          data:{
            getFoods: [result.data.createFood,...data.getFoods]
          }
       });//By updating the cache in this way, the new food-object will be immediately visible on the Home component without requiring a page refresh,
       
       navigate('/dashboard')
     },

     onError(error) {
      console.log(error.message);
      console.log(error.graphQLErrors.message);
      setError(error?.message);
    },

    variables: { 
      ...formData, price: parsedPrice 
    },
  });

  const [editFood,{loading : editFoodLoading}] = useMutation(EDIT_FOOD,{
    update(proxy, result){
      const data = proxy.readQuery({
       query: GET_FOODS
      });
      
      proxy.writeQuery({ 
         query:GET_FOODS,
         data:{
           getFoods: [result.data.editFood,...data.getFoods]
         }
      });
      
      navigate('/dashboard')
    },
  });


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(id){
      try {
        await editFood({
          variables: {
            id,
            name,
            description,
            category,
            images,
            price,
            ingredients,
            isSpicy,
            isVege
          },
          
        });
        
      } catch (error) {
        console.error(error);
      }
    }else{
      createFood();
    } 
  };
  
  
  return (
    <div className='flex w-full h-screen justify-center items-center p-4'>
      <form 
      onSubmit={onSubmitHandler}
      className='flex flex-col w-full border-y-2 border-x border-x-zinc-500 border-y-zinc-700 p-4 gap-2'
      >
        {/* Images display section  */}
        <div className='flex'>
           {images?.map((image,index)=>(
            <div key={`${index}-${image}`} className='flex relative'>
               <img 
               src={image} 
               alt={`${index + 1}`}
               className="w-[70px] h-[70px]"
               />
              <button 
              type='button'
              className='bg-slate-500 bg-opacity-50 text-slate-200 rounded-full p-[2px] absolute right-[3px] top-[3px]'
              onClick={()=>handleRemoveImage(index)}
              >
                <AiOutlineCloseCircle/>
              </button>
            </div>
           ))}
        </div>

        {/* Image input section */}
        <div>
            <input 
            type="file"
            ref={fileInputRef}
            multiple
            accept='image/*'
            hidden
            onChange={handleImageChange} 
             />
            <button 
            type='button'
            onClick={handleAddImage}
            className='border border-zinc-700 rounded-lg text-[12px] px-2'
            >
              Add Image
            </button> 
        </div>

         {/* Name section */}
         <input 
         type="text" 
         required
         name='name'
         value={name}
         onChange={onChangeHandler}
         placeholder='Name of the Food'
         className='w-full border-x-[2px] border-x-zinc-500 border-y-[4px] border-y-zinc-700 outline-none px-2 py-1'
         />
        {/* Input field for ingredients */}
        <input
          type='text'
          name='ingredients'
          required
          value={ingredients.join(',')}
          onChange={onIngredientsChange}
          onKeyUp={onKeyUpHandler}
          placeholder='Enter ingredients (comma-separated)'
          className='w-full border-x-[2px] border-x-zinc-500 border-y-[4px] border-y-zinc-700 outline-none px-2 py-1'
        />
        {/* Price section */}
         <input 
         name='price'
         required
         value={price}
         onChange={onChangeHandler}
         placeholder='Price of the Food $'
         min={0}
         className='w-full border-x-[2px] border-x-zinc-500 border-y-[4px] border-y-zinc-700 outline-none px-2 py-1'
         />
         {/* Description section */}
         <textarea 
         required
         name="description" 
         cols="5" 
         rows="5"
         placeholder='Description'
         value={description}
         onChange={onChangeHandler}
         className='w-full border-x-[2px] border-x-zinc-500 border-y-[4px] border-y-zinc-700 outline-none px-2 py-1'
         />
         {/* Category section */}
         <select 
         required
         name="category"
         className='w-full border-x-[2px] border-x-zinc-500 border-y-[4px] border-y-zinc-700 outline-none px-2 py-1'
         value={category}
         onChange={onChangeHandler}
         >
           <option value="" disabled>Select a Category</option>
           <option>Beverages</option>
           <option>Foods</option>
           <option>Breakfasts</option>
           <option>Desserts</option>
         </select>
         {/* isSpicy and isVege section */}
         <div className='flex gap-5'>
            {/* Checkbox for isSpicy */}
            <label>
              <input
                type="checkbox"
                name='isSpicy'
                checked={isSpicy}
                onChange={onChangeHandler}
              />
              Is Spicy
            </label>

            {/* Checkbox for isVege */}
            <label>
              <input
                type="checkbox"
                name='isVege'
                checked={isVege}
                onChange={onChangeHandler}
              />
              Is Vegetarian
            </label>
         </div>

         <button 
         type='sumbit'
         className='w-full border-x-[2px] border-x-zinc-500 border-y-[4px] border-y-zinc-700 rounded-lg'>
          {/* {loading ? 'Loading...' : 'Submit'} */}
          {id ? (<>{editFoodLoading ? 'Loading...' : 'Updated'} </>): (<>{loading ? 'Loading...' : 'Submit'} </>)}
         </button>
         <p className='flex w-full rounded-lg bg-red-700 text-white text-center'>{error}</p>
      </form>
    </div>
  )
}

export default CreateFood;