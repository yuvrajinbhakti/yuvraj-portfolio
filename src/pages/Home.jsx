import {Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../Components/Loader'

{/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center" >
    POPUP
</div> */}

const Home = () => {
  return (

    <section className="w-full h-screen relative">
<Canvas className='w-full h-screen bg-transparent' camera={{near:0.1,far:1000}}>                {/*Canvas acts as root component that sets up our entire 3D scene so All 3D Scenes will be rendered within this canvas */}

<Suspense fallback={<Loader/>} >            {/* Suspense is used for rendering loading screen. like while 3D modal is loading  it will show the loader   */}

<directionalLight/>
<ambientLight/>
<pointLight/>
<spotLight/>
<hemisphereLight/>

</Suspense>

</Canvas>
    </section>

  )
}

export default Home
