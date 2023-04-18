class Store {
  constructor() {
    this.isAuth = false;
    this.user = null;
    this.token = null;
    this.orders = [];
    this.cart = [];
    this.products = [];
    this.error = '';
    this.users = [];
    this.loading = true;
  }

  setIsAuth(isAuth) {
    this.isAuth = isAuth;
  }

  setUser(user) {
    this.user = user;
  }

  setToken(token) {
    this.token = token;
  }

  setUsers(users) {
    this.users = users;
  }

  setOrders(orders) {
    this.orders = orders;
  }

  setCart(cart) {
    this.cart = cart;
  }

  setProducts(products) {
    this.products = products;
  }

  setError(error) {
    this.error = error;
  }

  setUsers(users) {
    this.users = users;
  }

  setLoading(loading) {
    this.loading = loading;
  }
}

export default new Store;