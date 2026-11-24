import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient.js'
import Auth from './Auth.jsx'

function App() {
  return (
    <div>

      <Auth ></Auth>

    </div>
  )
}

export default App
