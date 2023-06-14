const reducer = (state, action) => {
    switch (action.type) {
        case "update_cart": {
            return { ...state, cart: state.cart,isLoading:true};
        }
        case "update_products": {
            return { ...state, products: state.products,isLoading:true };
        } 
        case "update_order": {
            return { ...state, order: state.order,isLoading:true };
        }
        case "show_product_detail": {
            return { ...state, product_detail: state.product_detail,isLoading:true };
        }
        case "show_order_detail": {
            return { ...state, order_detail: state.order_detail,isLoading:true };
        }
        case "get_user_info": {
            return { ...state, user: state.user,isLoading:true };
        }
        case "user_login": {
            return { ...state, user_login: state.user_login,isLoading:true };
        }
        case "user_detail": {
            return { ...state, user_detail: state.user_detail,isLoading:true };
        }
        case "update_categories": {
            return { ...state, categories: state.categories,isLoading:true };
        }
        case "get_cart_statis": {
            return { ...state, cart_statis: state.cart_statis,isLoading:true };
        }
        case "show_cart_detail": {
            return { ...state, cart_detail: state.cart_detail,isLoading:true };
        }
        case "show_loading":{
            return { ...state, isLoading:true};
        }
        case "hide_loading":{
            return { ...state, isLoading:false};
        }
        
        default: return state;
    }
}
export default reducer;