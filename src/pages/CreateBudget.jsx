import React, { useState } from "react";
import Button from "../components/ui/button.jsx";

function CreateBudget() {
  const [eventType, setEventType] = useState("");
  const [numAttendees, setNumAttendees] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    { id: 1, name: "Decoración Floral" },
    { id: 2, name: "Iluminación" },
    { id: 3, name: "Mobiliario (Mesas y Sillas)" },
  ];

  const handleServiceChange = (id) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(id)
        ? prevServices.filter((serviceId) => serviceId !== id)
        : [...prevServices, id]
    );
  };

  const calculateCost = () => {
    const baseCost = 500;
    const serviceCost = selectedServices.length * 200;
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
              <span className="text-gray-700 text-lg">{service.name}</span>
            </div>
          ))}
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
