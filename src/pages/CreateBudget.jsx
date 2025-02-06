import React, { useState, useEffect } from "react";
import Button from "../components/ui/button";
import { db } from "../firebase";
import { collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";

function CreateBudget() {
  const [eventType, setEventType] = useState("");
  const [numAttendees, setNumAttendees] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceCost, setNewServiceCost] = useState("");

  const servicesCollection = collection(db, "services");

  useEffect(() => {
    const unsubscribe = onSnapshot(servicesCollection, (snapshot) => {
      const servicesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesData);
    });

    return unsubscribe;
  }, []);

  const handleServiceChange = (id) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(id)
        ? prevServices.filter((serviceId) => serviceId !== id)
        : [...prevServices, id]
    );
  };

  const handleAddService = async () => {
    if (newServiceName && !isNaN(newServiceCost) && newServiceCost >= 0) {
      try {
        await addDoc(servicesCollection, {
          name: newServiceName,
          cost: Number(newServiceCost),
        });
        setNewServiceName("");
        setNewServiceCost("");
      } catch (error) {
        console.error("Error al agregar servicio: ", error);
      }
    } else {
      alert("Por favor ingrese un nombre y un costo válido para el servicio.");
    }
  };

  const handleServiceCostChange = (id, newCost) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, cost: Number(newCost) } : service
      )
    );
  };

  const calculateCost = () => {
    const baseCost = 500;
    const serviceCost = selectedServices.reduce((total, serviceId) => {
      const service = services.find((s) => s.id === serviceId);
      return service ? total + service.cost : total;
    }, 0);
    const attendeeCost = numAttendees * 10;
    return baseCost + serviceCost + attendeeCost;
  };

  return (
    <div className="p-10 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
        Crear Presupuesto
      </h2>
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Tipo de Evento
          </label>
          <select
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="">Selecciona un evento</option>
            <option value="Boda">Boda</option>
            <option value="Cumpleaños">Cumpleaños</option>
            <option value="Corporativo">Corporativo</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Número de Asistentes
          </label>
          <input
            type="number"
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={numAttendees}
            onChange={(e) => setNumAttendees(Number(e.target.value))}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2 text-gray-700">
            Servicios
          </label>
          {services.map((service) => (
            <div key={service.id} className="flex items-center mb-4">
              <input
                type="checkbox"
                className="mr-3 h-5 w-5 focus:ring-2 focus:ring-blue-400"
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceChange(service.id)}
              />
              <span className="text-gray-700 text-lg mr-4">{service.name}</span>
              <input
                type="number"
                className="border w-24 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={service.cost}
                onChange={(e) =>
                  handleServiceCostChange(service.id, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Agregar Nuevo Servicio
          </h3>
          <input
            type="text"
            placeholder="Nombre del servicio"
            className="border rounded-lg px-4 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Costo del servicio"
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newServiceCost}
            onChange={(e) => setNewServiceCost(e.target.value)}
          />
          <Button
            className="bg-blue-500 text-white w-full mt-4"
            onClick={handleAddService}
          >
            Agregar Servicio
          </Button>
        </div>

        <div className="mt-8">
          <Button className="bg-green-500 text-white w-full py-3">
            Costo Estimado: ${calculateCost()}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateBudget;
