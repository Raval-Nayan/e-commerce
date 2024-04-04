const FilterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => curElem.price);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 5 ~ filterReducer ~ priceArr",
        priceArr
      );

      let maxPrice = Math.max(...priceArr);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 23 ~ filterReducer ~ maxPrice",
        maxPrice
      );

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "DROPDOWN_SORT_DATA":
      return {
        ...state,
        sort_Value: action.payload,
      };

    case "SORTING_PRODUCTS":
      const { filter_products, sort_Value } = state;

      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        console.log(a.name, "a to be match");
        console.log(b.name, "b to a match");

        if (sort_Value === "lowest") {
          return a.price - b.price;
        }

        if (sort_Value === "a-z") {
          return a.name.localeCompare(b.name);
        }

        if (sort_Value === "z-a") {
          return b.name.localeCompare(a.name);
        }

        if (sort_Value === "higher") {
          return b.price - a.price;
        }
      };

      const newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_SEARCH_DATA_SET_VALUE":
      const { name, value } = action.payload;
      console.log(name, value);
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_SEARCH_PRODUCTS":
      const { all_products } = state;
      const { Search_text, category, company, color, price } = state.filters;
      let tempSearchProduct = [...all_products];

      console.log(company, "yyyyyyyyyyyyyy");
      if (Search_text) {
        tempSearchProduct = tempSearchProduct.filter((curEle) => {
          return curEle.name.toLowerCase().includes(Search_text);
        });
      }

      if (category !== "all") {
        tempSearchProduct = tempSearchProduct.filter((curEle) => {
          return curEle.category === category;
        });
      }

      if (company !== "all") {
        tempSearchProduct = tempSearchProduct.filter((curEle) => {
          return curEle.company.toLowerCase() === company.toLowerCase();
        });
      }

      if (color !== "all") {
        tempSearchProduct = tempSearchProduct.filter((curEle) => {
          return curEle.colors.includes(color);
        });
      }
      if (price === 0) {
        tempSearchProduct = tempSearchProduct.filter(
          (curElem) => curElem.price === price
        );
      } else {
        tempSearchProduct = tempSearchProduct.filter(
          (curElem) => curElem.price <= price
        );
      }

      console.log(
        tempSearchProduct,
        "exampleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      );

      return {
        ...state,
        filter_products: tempSearchProduct,
      };

    case "ALL_FILTER_ARE_CLEAR":
      return {
        ...state,
        filters: {
          ...state.filters,
          Search_text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: state.filters.maxPrice,
          price: state.filters.price,
          minPrice: state.filters.minPrice,
        },
      };

    default:
      return state;
  }
};

export default FilterReducer;
