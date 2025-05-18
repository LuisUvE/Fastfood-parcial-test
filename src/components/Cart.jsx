import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartItems, totalQuantity } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // Calcula total sumando precio * cantidad
  const totalPrice = cartItems.reduce((sum, item) => {
    // Quita símbolos, coma y puntos para convertir precio a número
    const priceNum = parseFloat(item.price.replace(/[^0-9.,]/g, "").replace(",", "."));
    return sum + (priceNum || 0) * item.quantity;
  }, 0);

  // Estado formulario pago
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    tarjeta: "",
    fechaExp: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Abre/cierra panel carrito
  const toggleCart = () => {
    setIsOpen((open) => !open);
    if (isPaying) setIsPaying(false);
  };

  // Abre formulario pago
  const handlePayClick = () => {
    setIsPaying(true);
  };

  // Vuelve al carrito desde formulario pago
  const handleCancelPayment = () => {
    setIsPaying(false);
  };

  // Envía formulario pago (simulación)
  const handlePaySubmit = (e) => {
    e.preventDefault();
    alert(`Gracias ${formData.nombre}, su pago de $${totalPrice.toFixed(2)} ha sido procesado.`);
    setIsPaying(false);
    setIsOpen(false);
    // Aquí limpiar carrito si quieres
  };

  return (
    <>
      {/* Icono carrito fijo */}
      <div
        onClick={toggleCart}
        style={{
          position: "fixed",
          top: 15,
          right: 15,
          background: "#eee",
          borderRadius: "50%",
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 10000,
          boxShadow: "0 0 8px rgba(0,0,0,0.3)",
          userSelect: "none",
        }}
        aria-label="Abrir carrito de compras"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") toggleCart();
        }}
      >
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 4h-2l-3 9v2h2a3 3 0 1 0 6 0h6a3 3 0 1 0 6 0h2v-2l-3-9h-2" />
        </svg>
        {totalQuantity > 0 && (
          <span
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "3px 8px",
              fontSize: 14,
              fontWeight: "bold",
              minWidth: 22,
              textAlign: "center",
              userSelect: "none",
            }}
            aria-live="polite"
          >
            {totalQuantity}
          </span>
        )}
      </div>

      {/* Panel lateral carrito */}
      {isOpen && !isPaying && (
        <aside
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 350,
            height: "100%",
            background: "#fff",
            boxShadow: "-3px 0 10px rgba(0,0,0,0.2)",
            padding: 20,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
          aria-label="Carrito de compras"
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              alignSelf: "flex-end",
              fontSize: "1.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Cerrar carrito"
          >
            &times;
          </button>

          <h2>Tu carrito</h2>

          {/* Lista scrollable */}
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              marginBottom: 12,
            }}
          >
            {cartItems.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                {cartItems.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      marginBottom: 10,
                      borderBottom: "1px solid #ddd",
                      paddingBottom: 10,
                    }}
                  >
                    <strong>{item.name}</strong>
                    <div>Cantidad: {item.quantity}</div>
                    <div>Precio unitario: ${item.price}</div>
                    <div>
                      Subtotal: $
                      {(
                        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) *
                        item.quantity
                      ).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Total centrado */}
          <div
            style={{
              textAlign: "center",
              fontWeight: 900,
              fontSize: "1.4rem",
              color: "#d35400",
              marginBottom: 8,
              userSelect: "none",
            }}
          >
            Total a pagar: ${totalPrice.toFixed(2)}
          </div>

          {/* Botón Pagar centrado */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={handlePayClick}
              style={{
                padding: "12px 30px",
                backgroundColor: "#d35400",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: 30,
                fontWeight: "bold",
                fontSize: "1.2rem",
                minWidth: 160,
                boxShadow: "0 4px 12px rgba(211, 84, 0, 0.6)",
                transition: "background-color 0.3s ease",
                userSelect: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b84300")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#d35400")}
            >
              Pagar
            </button>
          </div>
        </aside>
      )}

      {/* Panel formulario pago */}
      {isOpen && isPaying && (
        <aside
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 350,
            height: "100%",
            background: "#fff",
            boxShadow: "-3px 0 10px rgba(0,0,0,0.2)",
            padding: 20,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
          aria-label="Formulario de pago"
        >
          {/* Botón volver */}
          <button
            onClick={handleCancelPayment}
            style={{
              alignSelf: "flex-end",
              fontSize: "1.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Volver al carrito"
          >
            &times;
          </button>

          <h2>Formulario de pago</h2>

          <form
            onSubmit={handlePaySubmit}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <label>
              Nombre completo:
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                placeholder="Tu nombre completo"
                style={{ width: "100%", padding: 6 }}
              />
            </label>
            <label>
              Dirección:
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
                placeholder="Dirección de envío"
                style={{ width: "100%", padding: 6 }}
              />
            </label>
            <label>
              Tarjeta de débito/crédito:
              <input
                type="text"
                name="tarjeta"
                value={formData.tarjeta}
                onChange={handleInputChange}
                required
                placeholder="Número de tarjeta"
                maxLength={19}
                style={{ width: "100%", padding: 6 }}
                pattern="\d{13,19}"
                title="Número de tarjeta válido"
              />
            </label>
            <label>
              Fecha de expiración (MM/AA):
              <input
                type="text"
                name="fechaExp"
                value={formData.fechaExp}
                onChange={handleInputChange}
                required
                placeholder="MM/AA"
                maxLength={5}
                style={{ width: "100%", padding: 6 }}
                pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                title="Formato MM/AA"
              />
            </label>
            <label>
              CVV:
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                required
                placeholder="Código CVV"
                maxLength={4}
                style={{ width: "100%", padding: 6 }}
                pattern="\d{3,4}"
                title="3 o 4 dígitos CVV"
              />
            </label>
            <button
              type="submit"
              style={{
                padding: 10,
                backgroundColor: "#d35400",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                borderRadius: 6,
                fontWeight: "bold",
                fontSize: "1.1rem",
                userSelect: "none",
              }}
            >
              Confirmar pago
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
