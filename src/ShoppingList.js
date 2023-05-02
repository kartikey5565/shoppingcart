import React, { useState, useEffect } from "react";

const ShoppingList = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [editing, setEditing] = useState(null);
  const [editedProduct, setEditedProduct] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = () => {
    if (newProduct.trim() !== "" && newPrice.trim() !== "") {
      setProducts([
        ...products,
        { name: newProduct, price: Number(newPrice) }
      ]);
      setNewProduct("");
      setNewPrice("");
    }
  };

  const handleEditProduct = (index) => {
    setEditing(index);
    setEditedProduct(products[index].name);
    setEditedPrice(products[index].price);
  };

  const handleUpdateProduct = () => {
    if (editedProduct.trim() !== "" && editedPrice.trim() !== "") {
      const updatedProducts = [...products];
      updatedProducts[editing] = {
        name: editedProduct,
        price: Number(editedPrice)
      };
      setProducts(updatedProducts);
      setEditing(null);
      setEditedProduct("");
      setEditedPrice("");
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const totalPrice = products.reduce(
    (accumulator, product) => accumulator + product.price,
    0
  );

  return (
    <div>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {editing === index ? (
              <div>
                <input
                  type="text"
                  value={editedProduct}
                  onChange={(e) => setEditedProduct(e.target.value)}
                />
                <input
                  type="number"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
                <button onClick={handleUpdateProduct}>Save</button>
              </div>
            ) : (
              <div>
                {product.name} - ${product.price.toFixed(2)}
                <button onClick={() => handleEditProduct(index)}>Edit</button>
                <button onClick={() => handleDeleteProduct(index)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div>Total Price: ${totalPrice.toFixed(2)}</div>
    </div>
  );
};

export default ShoppingList;

