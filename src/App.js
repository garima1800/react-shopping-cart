import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      carttItems: localStorage.getItem("carttItems")
        ? JSON.parse(localStorage.getItem("carttItems"))
        : [],

      size: "",
      sort: "",
    };
  }
  createOrder = (order) => {
    alert("Need to save order for" + order.name);
  };
  addToCart = (product) => {
    console.log(product);
    console.log(this.state.carttItems);
    const carttItems = this.state.carttItems.slice();
    let alreadyInCart = false;
    // console.log(cartItems);
    carttItems.forEach((item) => {
      console.log(item);
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      carttItems.push({ ...product, count: 1 });
    }
    this.setState({ carttItems });
  };
  //how this condition is working
  removeFromCart = (product) => {
    console.log(product);
    console.log(this.state.carttItems);
    const carttItems = this.state.carttItems.slice();
    console.log(carttItems);
    this.setState({
      carttItems: carttItems.filter((v) => v._id !== product._id),
    });
    localStorage.setItem(
      "carttItems",
      JSON.stringify(carttItems.filter((v) => v._id !== product._id))
    );
  };
  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(event.target.value);

    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest "
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };
  filterProducts = (event) => {
    // console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, product: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };
  render() {
    console.log(this.state.products);

    return (
      <div className="grid-container">
        <header>
          {" "}
          <a href="/">React Shopping Cart</a>{" "}
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              >
                {" "}
              </Products>
            </div>
            <div className="sidebar">
              {" "}
              <Cart
                carttItems={this.state.carttItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
