import {Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../Components/Loader'
import Island from '../models/Island'

{/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center" >
    POPUP
</div> */}

const Home = () => {

  const adjustIslandForScreenSize=()=>{
    let rotation=[0.1,4.7,0];
    let screenScale=null;
    let screenPosition=[0,-6.5,-43];
if(window.innerWidth<768){
    screenScale=[0.9,0.9,0.9];
  }
  else{
    screenScale=[1,1,1];
  }
return [screenScale,screenPosition,rotation];
}
const [islandScale, islandPosition,islandRotation]=adjustIslandForScreenSize();

  return (

    <section className="w-full h-screen relative">
<Canvas className='w-full h-screen bg-transparent' camera={{near:0.1,far:1000}}>                {/*Canvas acts as root component that sets up our entire 3D scene so All 3D Scenes will be rendered within this canvas */}

<Suspense fallback={<Loader/>} >            {/* Suspense is used for rendering loading screen. like while 3D modal is loading  it will show the loader   */}

<directionalLight position={[1,1,1]} intensity={2} />
<ambientLight intensity={0.5} />
<hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
<Island position={islandPosition} scale={islandScale} rotation={islandRotation}/>
</Suspense>

</Canvas>
    </section>

  )
}

export default Home
