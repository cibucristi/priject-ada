import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mcdLogo from "./assets/mcdonalds.jpg"; 
import { Card, CardContent } from "@/components/ui/card"; 

// Credenciales fijas
const VALID_EMAIL = "cibucristi1@gmail.com";
const VALID_PASSWORD = "jdjasodsa";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Verificar si hay sesión en localStorage
  useEffect(() => {
    const savedLogin = localStorage.getItem("loginData");
    if (savedLogin) {
      const { expiresAt } = JSON.parse(savedLogin);
      if (new Date().getTime() < expiresAt) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("loginData");
      }
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const expiresAt = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 días
      localStorage.setItem("loginData", JSON.stringify({ expiresAt }));
      setIsLoggedIn(true);
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  };

  // Restaurantes aceptados en Madrid
  const restaurantesMadrid = [
    { zona: "Centro", nombre: "McDonald's Gran Vía" },
    { zona: "Centro", nombre: "McDonald's Puerta del Sol" },
    { zona: "Salamanca", nombre: "McDonald's Goya" },
    { zona: "Chamartín", nombre: "McDonald's Plaza Castilla" },
    { zona: "Moncloa", nombre: "McDonald's Princesa" },
    { zona: "Chamberí", nombre: "McDonald's Quevedo" },
    { zona: "Retiro", nombre: "McDonald's Ibiza" },
    { zona: "Arganzuela", nombre: "McDonald's Méndez Álvaro" },
    { zona: "Tetuán", nombre: "McDonald's Bravo Murillo" },
    { zona: "Carabanchel", nombre: "McDonald's Vista Alegre" },
    { zona: "Latina", nombre: "McDonald's Aluche" },
    { zona: "Usera", nombre: "McDonald's Plaza Elíptica" },
    { zona: "Villaverde", nombre: "McDonald's Los Ángeles" },
    { zona: "San Blas", nombre: "McDonald's Las Rosas" },
    { zona: "Hortaleza", nombre: "McDonald's Gran Vía de Hortaleza" },
  ];

  // Restaurantes rechazados en Valencia
  const restaurantesValencia = [
    { zona: "Centro", nombre: "McDonald's Plaza del Ayuntamiento" },
    { zona: "Ruzafa", nombre: "McDonald's Ruzafa" },
    { zona: "Campanar", nombre: "McDonald's Nuevo Centro" },
    { zona: "Malvarrosa", nombre: "McDonald's Playa Malvarrosa" },
    { zona: "Benimaclet", nombre: "McDonald's Benimaclet" },
  ];

  const razonesRechazo = [
    "Actualmente hay una disponibilidad limitada de vacantes en la zona.",
    "Alta demanda de candidatos frente a la capacidad actual de contratación.",
    "No hay suficientes plazas abiertas en este momento en los restaurantes de la ciudad.",
    "El proceso de selección ha sido muy competitivo con pocas posiciones disponibles.",
    "Los establecimientos de la zona presentan un ritmo de contratación más reducido."
  ];
  

  if (!isLoggedIn) {
    // Página de Login
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-2xl p-8 w-96">
          <img src={mcdLogo} alt="McDonald's España" className="h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Página Principal
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md p-4 flex justify-center">
        <img src={mcdLogo} alt="McDonald's España" className="h-16" />
      </header>

      <main className="p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* PERFIL */}
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            Perfil del Candidato
          </h1>

          <Card className="mb-10 shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Cristian David Cibu
              </h2>
              <p className="text-gray-600">
                Cristian ha sido recientemente aceptado como parte del equipo en la
                red de restaurantes McDonald's en Madrid. Con gran dedicación y
                entusiasmo, formará parte de una organización con presencia en
                distintas zonas estratégicas de la ciudad.
              </p>
            </CardContent>
          </Card>

          {/* MADRID */}
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Restaurantes McDonald's en Madrid (Aceptado)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {restaurantesMadrid.map((rest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="shadow-md rounded-2xl hover:shadow-xl transition">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {rest.nombre}
                    </h3>
                    <p className="text-gray-500">Zona: {rest.zona}</p>
                    <p className="text-green-600 font-bold">Estado: Aceptado ✅</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* VALENCIA */}
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Restaurantes McDonald's en Valencia (Solicitudes Rechazadas)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantesValencia.map((rest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="shadow-md rounded-2xl hover:shadow-xl transition bg-red-50">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {rest.nombre}
                    </h3>
                    <p className="text-gray-500">Zona: {rest.zona}</p>
                    <p className="text-red-600 font-bold">Estado: Rechazado ❌</p>
                    <p className="text-gray-600 text-sm">
                      Razón: {razonesRechazo[index % razonesRechazo.length]}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;
