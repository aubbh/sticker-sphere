import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import Map from './Map.jsx'

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const [donnees, setDonnees] = useState(null)
    const [erreur, setErreur] = useState(null)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setMessage(`❌ Erreur : ${error.message}`)
        } else {
            setAuthenticated(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!authenticated) return;

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
    }, [authenticated]) // changes when authenticated changes



    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
            {authenticated ? (
                <div>
                    <h1>Statut de la connexion Supabase</h1>

                    {erreur && (
                        <div style={{ color: 'red' }}>
                            <p>La connexion a échoué : {erreur}</p>
                        </div>
                    )}

                    {donnees ? (
                        <div style={{ color: 'green' }}>
                            <p>Connexion réussie - Données de la base :</p>
                            <pre>{JSON.stringify(donnees[0]["message"], null, 2)}</pre>
                        </div>
                    ) : (
                        <p>Chargement des données...</p>
                    )}

                    <Map ></Map>

                    <button onClick={() => setAuthenticated(false)} style={{ marginTop: '1rem' }}>
                        Se déconnecter
                    </button>
                </div>
            ) : (
                <div>
                    <h1>Connexion</h1>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="email"
                            placeholder="exemple@exemple.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={handleLogin} disabled={loading}>
                                {loading ? 'Chargement...' : 'Se connecter'}
                            </button>
                        </div>
                    </form>
                    {message && <p>{message}</p>}

                </div>
            )}
        </div>
    )
}