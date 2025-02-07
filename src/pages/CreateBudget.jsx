import React, { useState, useEffect } from "react";
import Button from "../components/ui/button";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function CreateBudget() {
  const [eventType, setEventType] = useState("");
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", cost: 0 });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      const querySnapshot = await getDocs(collection(db, "services"));
      const fetchedServices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        quantity: 1,
      }));
      setServices(fetchedServices);
    };

    fetchServices();
  }, []);

  const handleServiceChange = (id, key, value) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, [key]: value } : service
      )
    );
  };

  const calculateCost = () => {
    const baseCost = 500;
    const serviceCost = services.reduce(
      (acc, service) => acc + service.cost * service.quantity,
      0
    );
    return baseCost + serviceCost;
  };

  const handleAddService = async () => {
    if (newService.name.trim() === "" || newService.cost <= 0) return;

    const docRef = await addDoc(collection(db, "services"), newService);
    setServices([...services, { id: docRef.id, ...newService, quantity: 1 }]);
    setNewService({ name: "", cost: 0 });
    setShowModal(false);
  };

  const handleDeleteService = async (id) => {
    await deleteDoc(doc(db, "services", id));
    setServices(services.filter((service) => service.id !== id));
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="w-2/4 bg-white shadow-lg p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-5">Crear Presupuesto</h2>

        <div className="mb-4">
          <label className="block mb-2">Tipo de Evento</label>
          <select
            className="border rounded px-3 py-2 w-full"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Selecciona un evento</option>
            <option value="Boda">Boda</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Corporativo">Corporativo</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Servicios</label>
          {services.map((service) => (
            <div key={service.id} className="flex items-center mb-2 space-x-3">
              <span>{service.name}</span>
              <input
                type="number"
                min="1"
                value={service.quantity}
                onChange={(e) =>
                  handleServiceChange(
                    service.id,
                    "quantity",
                    Number(e.target.value)
                  )
                }
                className="border rounded px-2 w-16"
              />
              <span>Costo: ${service.cost}</span>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <Button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white"
          >
            Agregar Servicio
          </Button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold mb-4">Nuevo Servicio</h3>
              <input
                type="text"
                placeholder="Nombre del Servicio"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <input
                type="number"
                placeholder="Costo del Servicio"
                value={newService.cost}
                onChange={(e) =>
                  setNewService({ ...newService, cost: Number(e.target.value) })
                }
                className="border rounded px-3 py-2 w-full mb-2"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddService}
                  className="bg-blue-500 text-white"
                >
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5">
          <Button className="bg-green-500 text-white">
            Costo Estimado: ${calculateCost()}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateBudget;
