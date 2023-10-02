import { gql } from "@apollo/client";

export const CREATE_FOOD = gql`
  mutation CreateFood(
    $name:String!, 
    $description:String!, 
    $category:String!, 
    $images:[String!]!, 
    $price:Int!, 
    $ingredients:[String!]!, 
    $isVege:Boolean!, 
    $isSpicy:Boolean!
    ){
     createFood(createFoodInput:{name:$name, description:$description, category:$category, images:$images, price:$price, ingredients:$ingredients, isVege:$isVege, isSpicy:$isSpicy}){
       name,
       description,
       category,
       images,
       price,
       ingredients
       isSpicy,
       isVege
     }
  }
`;

export const GET_FOODS = gql`
  query GetFoods {
    getFoods {
      id
      name
      description
      category
      images
      price
      ingredients
      isSpicy
      isVege
    }
  }
`;

export const GET_FOOD = gql`
  query GetFood($id: ID!) {
    getFood(id: $id) {
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

export const EDIT_FOOD = gql`
  mutation EditFood(
    $id:ID!
    $name:String!, 
    $description:String, 
    $category:String, 
    $images:[String!], 
    $price:Int, 
    $ingredients:[String!], 
    $isVege:Boolean, 
    $isSpicy:Boolean
    ){
     editFood(id:$id,editInput:{name:$name, description:$description, category:$category, images:$images, price:$price, ingredients:$ingredients, isVege:$isVege, isSpicy:$isSpicy}){
       name,
       description,
       category,
       images,
       price,
       ingredients,
       isSpicy,
       isVege
     }
  }
`;