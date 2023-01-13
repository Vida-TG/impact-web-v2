import supabase from "../config/supabaseConfig"
import { useEffect, useState } from "react"

import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  const [ fetchError, setFetchError ] = useState(null)
  const [ smoothies, setSmoothies ] = useState(null)

  const fetchSmoothies = async () => {
    const { data, error } = await supabase
      .from('smoothies')
      .select()

      if (error) {
        setFetchError('Could not fetch')
        setSmoothies(null)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
  }


  const handleDelete = (id) => {
    fetchSmoothies()
  }

  useEffect(() => {
    fetchSmoothies()
  }, [])
  
  return (
    <div className="page home">
      { fetchError && (<p>{fetchError}</p>)}
      { smoothies && (
        <div className="smoothies">
          <div className="smoothie-grid">
            { smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete}/>
            ))
            }
          </div>
        </div>
        )
      }
    </div>
  )
}

export default Home