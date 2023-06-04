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
        case "update_categories": {
            return { ...state, categories: state.categories,isLoading:true };
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