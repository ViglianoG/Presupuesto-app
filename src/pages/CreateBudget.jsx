import React, { useState } from "react";
import  Button  from "../components/ui/button.jsx";

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
    <div className="p-10">
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
        <label className="block mb-2">Número de Asistentes</label>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          value={numAttendees}
          onChange={(e) => setNumAttendees(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Servicios</label>
        {services.map((service) => (
          <div key={service.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedServices.includes(service.id)}
              onChange={() => handleServiceChange(service.id)}
            />
            <span>{service.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <Button className="bg-green-500 text-white">
          Costo Estimado: ${calculateCost()}
        </Button>
      </div>
    </div>
  );
}

export default CreateBudget;
