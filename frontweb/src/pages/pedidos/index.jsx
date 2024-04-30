import { useEffect, useState } from "react";
import backgroundImage from "../../assets/pizzaNostra.png";
import remove from "../../assets/remove.png";
import { useMenuBitsState } from "../../context/MenuBitsContext";
import { useNavigate } from "react-router-dom";

export default function MeusPedidos() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { menuId, selectedOrder, setSelectedOrder  } = useMenuBitsState();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const local = localStorage.getItem("pedidos");
        const parsedLocal = JSON.parse(local) || [];
        setSelectedOrder(parsedLocal);

        // Calcula o total da compra somando os preços de cada item no carrinho
        const total = parsedLocal.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
      } catch (error) {
        console.error("Erro ao buscar os pedidos:", error);
      }
    };

    fetchOrder();
  }, [setSelectedOrder]);

  
  const handleRemove = async(index) => {
    const copyOrder = [...selectedOrder];
    copyOrder.splice(index, 1);
    setSelectedOrder(copyOrder);
    localStorage.setItem(
        "pedidos",
        JSON.stringify(copyOrder)
      );
    // Recalcula o total da compra após a remoção do item
    const total = copyOrder.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  const handleBackMenu = () => {
    navigate(`/menu-page/${menuId}`)
  };

  return (
    <div>
      <div
        className="bg-image w-full h-96 bg-left cover flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="text-white font-semibold text-7xl">Nostra Pizza</h1>
      </div>
      <div className="flex flex-col items-center justify-center h-auto pb-20">
        <div className="p-10 flex items-center justify-center w-full border-b border-gray-500">
          <h3 className="text-3xl font-bold">Meus Pedidos</h3>
        </div>
        {selectedOrder.length === 0 ? (
          <p className="text-2xl mt-4">CARRINHO VAZIO</p>
        ) : (
          <div className="w-1/2 bg-amber-100">
            {selectedOrder.map((item, index) => (
              <div
                key={index}
                className="flex w-full items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <button onClick={() => handleRemove(item.id)}>
                    <img src={remove} className="w-6" alt="" />
                  </button>
                  <img src={item.img} alt="Pizza" />
                  <p>{item.name}</p>
                </div>
                <div>
                  <p>R$ {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {selectedOrder.length > 0 && (
          <div className="w-1/2 bg-red-600 p-4 flex items-center justify-between">
            <p>TOTAL</p>
            <p>R$ {totalPrice}</p>
          </div>
        )}
        <div className="pt-12">
          <a onClick={handleBackMenu} className="rounded-xl bg-red-600 p-4 text-white">
            VOLTAR AO CARDÁPIO
          </a>
        </div>
      </div>
    </div>
  );
}