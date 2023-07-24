import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'userActions',
    initialState:{
        bookmarks:[],
        wishlist:[],
        cart:[],
        reviews:[]
    },
    reducers:{
        addtoCart:(state,action)=>{
            const newCart=[...state.cart,action.payload];
            state.cart=newCart;
        },
        addBookmark:(state,action)=>{
            const newBookMarks=[...state.bookmarks,action.payload];
            state.bookmarks=newBookMarks;
        },
        addReviews:(state,action)=>{
            const newReviews=[...state.reviews,action.payload];
            state.reviews=newReviews;
            console.log(state.reviews);
        },
        addWishlist:(state,action)=>{
            const newWishlist=[...state.wishlist,action.payload];
            state.wishlist=newWishlist;
        }
    },
});
export const{addtoCart,addBookmark,addReviews,addWishlist}=userSlice.actions;
export default userSlice.reducer;
