const beverageCheck = ({milk, coffeeBean, sweetener, topping, temperature}) => {
    if (topping === "Whipped Cream" && temperature === "Iced") {
        return {
            status: false, 
            message: "Whipped cream is commonly associated with hot beverages, so it may not be suitable or practical to include it as a topping for iced beverages."
        }
    }
    if (sweetener === "Honey" && milk === "Soy Milk") {
        return {
            status: false, 
            message: "Some individuals who choose soy milk as a dairy alternative may prefer to avoid sweeteners derived from animals, such as honey, so this combination might not align with the dietary preferences."
        }
    }
    if (milk === "Skim Milk" && temperature === "Iced") {
        return {
            status: false, 
            message: "Skim milk may not taste good in iced beverages due to its low fat content."
        }
    }
    return {
        status: true, 
        message: ""
    }
}

export default beverageCheck