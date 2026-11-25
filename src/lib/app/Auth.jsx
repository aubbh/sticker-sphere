import { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'
import MapView from './MapView.jsx'
import NavBar from './components/NavBar.jsx'

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
            const { data: { user }, error: errorUser } = await supabase.auth.getUser();

            if (errorUser) {
                console.error("Erreur Supabase user :", errorUser)
                setErreur(errorUser.message)
            } else {
                const { data, error } = await supabase.from('profiles').select('pseudo').eq('uuid', user.id);

                if (error) {
                    console.error("Erreur Supabase :", error)
                    setErreur(error.message)
                } else {
                    console.log("Auth OK")
                    setDonnees(data)
                }
            }

        }

        verifierConnexion()
    }, [authenticated]) // changes when authenticated changes



    return (
        <div>
            {authenticated ? (
                <div className="pageLayout">
                    <MapView></MapView>
                    <NavBar></NavBar>
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