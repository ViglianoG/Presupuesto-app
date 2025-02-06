import React from "react";
import { Link } from "react-router-dom";
import  Button  from "../components/ui/button.jsx";

function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Bienvenido a la App de Presupuestos de Eventos
      </h1>
      <p className="text-lg mb-5">
        Selecciona un tipo de evento y crea un presupuesto rápidamente.
      </p>
      <Link to="/create-budget">
        <Button className="bg-blue-500 text-white">Crear Presupuesto</Button>
      </Link>
    </div>
  );
}

export default Home;
