import {gql} from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
    id
    userId
    userName
    paid
    subTotal
    deliveryStatus
    line_items {
      name
      cartQuantity
      price
    }
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id:ID!) {
    getOrder(id:$id) {
    id
    userName
    email
    phone
    postalCode
    paid
    deliveryStatus
    full_address
    subTotal
    line_items {
      id  
      name
      cartQuantity
      price
      images
    }
    }
  }
`;


export const DELETE_ORDER = gql`
 mutation DeleteOrder($id:ID!){
    deleteOrder(id:$id)
 }
`;


export const EDIT_ORDER = gql`
  mutation EditOrder($id:ID!, $deliveryStatus:String){
    editOrder(id:$id,deliveryStatus:$deliveryStatus){
      deliveryStatus
     }
  }
`;