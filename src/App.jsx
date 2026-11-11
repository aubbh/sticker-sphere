import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient.js'

function App() {
  const [donnees, setDonnees] = useState(null)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    async function verifierConnexion() {
      const { data, error } = await supabase.from('test_table').select('*')

      if (error) {
        console.error("Erreur Supabase :", error)
        setErreur(error.message)
      } else {
        console.log("Données reçues :", data)
        setDonnees(data)
      }
    }

    verifierConnexion()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Statut de la connexion Supabase</h1>

      {erreur && (
        <div style={{ color: 'red' }}>
          <p>❌ La connexion a échoué : {erreur}</p>
        </div>
      )}

      {donnees ? (
        <div style={{ color: 'green' }}>
          <p>✅ Connexion réussie ! Voici les données de la base :</p>
          <pre>{JSON.stringify(donnees[0]["message"], null, 2)}</pre>
        </div>
      ) : (
        <p>⏳ Tentative de connexion en cours...</p>
      )}
    </div>
  )
}

export default App