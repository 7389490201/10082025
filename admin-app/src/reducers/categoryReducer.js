import { categoryConstant } from "../actions/constants"

const initState = {
    categories: [],
    loading: false,
    error: null

}

// const buildNewCategory = (categories, category) => {
//     let myCategories = [];
//     if (category.parentId) {
//         for (let cat of categories) {
//             if (cat._id === category.parentId) {
//                 const newCategory = {
//                     ...category,
//                     children: cat.children ? [...cat.children, category] : []
//                 }
//                 myCategories.push(newCategory);
//             } else {
//                 myCategories.push(cat);
//             }
//         }
//     } else {
//         myCategories.push({
//             ...category,
//             children: []
//         });
//     }
//     return myCategories;
// }

export default (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case categoryConstant.GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload.categories
            }
        case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                // categories: action.payload.category,
            }
        default:
            return state
    }

}