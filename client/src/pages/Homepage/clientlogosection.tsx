import Slider from 'react-infinite-logo-slider';
import ContactUsForm from './contactusform';
interface Logo {
  name: string;
  img: string;
  faded?: boolean;
  size?: { w: number; h: number };
}

// Only use images that are present in the /images/logos/ folder
const allLogos: Logo[] = [
  { name: 'BERGER', img: '/images/logos/BERGER.png', size: { w: 90, h: 55 } },
  
  { name: 'ALBA', img: '/images/logos/ALBA.jpg', size: { w: 80, h: 36 } },
  { name: 'ADNA', img: '/images/logos/ADNA.jpg', size: { w: 90, h: 72 } },
  { name: 'hITECH', img: '/images/logos/hITECH.jpeg.jpg', size: { w: 90, h: 90 } },
  { name: 'FANUC', img: '/images/logos/FANUC.png', size: { w: 100, h: 100 } },
  { name: 'PARC', img: '/images/logos/PARC.jpeg.jpg', size: { w: 120, h: 122 } },
  { name: 'DABUR', img: '/images/logos/DABUR.png', size: { w: 80, h: 46 } },
  { name: 'vac', img: '/images/logos/vac.png', size: { w: 80, h: 65 } },
  { name: 'COMRADES', img: '/images/logos/COMRADES.jpeg.jpg', size: { w: 102, h: 102 } },
  { name: 'ABB', img: '/images/logos/ABB.png', size: { w: 100, h: 80 } },
  { name: 'SKYLINEAUTO', img: '/images/logos/SKYLINEAUTO.jpeg.jpg', size: { w: 100, h: 100 } },
  { name: 'COLGATE', img: '/images/logos/COLGATE.png', size: { w: 100, h: 100 } },
  { name: 'HEALTHCARE', img: '/images/logos/HEALTHCARE.png', size: { w: 110, h: 50 } },
  { name: 'ola', img: '/images/logos/ola.png', size: { w: 90, h: 42 } },
  { name: 'YASKAWA', img: '/images/logos/YASKAWA.png', size: { w: 100, h: 100 } },
  
  { name: 'lmw', img: '/images/logos/lmw.png', size: { w: 90, h: 45 } },
];

// Distribute logos evenly across 3 rows, each logo only once
type RowLogos = [Logo[], Logo[], Logo[]];
function distributeLogos(logos: Logo[]): RowLogos {
  const row1: Logo[] = [];
  const row2: Logo[] = [];
  const row3: Logo[] = [];
  logos.forEach((logo, idx) => {
    if (idx % 3 === 0) row1.push(logo);
    else if (idx % 3 === 1) row2.push(logo);
    else row3.push(logo);
  });
  return [row1, row2, row3];
}

const [row1, row2, row3] = distributeLogos(allLogos);

function LogoSliderRow({ logos, toRight = false, duration = 20 }: { logos: Logo[]; toRight?: boolean; duration?: number }) {
  // Show each logo only once, no duplication
  return (
    <div className="w-full relative">
      
      <Slider
        width="200px"
        duration={duration}
        pauseOnHover={true}
        blurBorders={false}
        toRight={toRight}
      >
        {logos.map((logo: Logo, idx: number) => (
          <Slider.Slide key={idx}>
            <div
              className={`flex items-center justify-center bg-white/35 backdrop-blur-[15px] border border-white/20  rounded-xl h-20 w-40 ${logo.faded ? 'opacity-40 grayscale' : ''}`}
              style={{ marginLeft: 30 }}
            >
              <img
                src={logo.img}
                alt={logo.name}
                style={{ width: logo.size?.w || 80, height: logo.size?.h || 32, objectFit: 'contain' }}
              />
            </div>
          </Slider.Slide>
        ))}
      </Slider>
    </div>
  );
}

export default function ClientlogoSection() {
  return (
    <div id="client-logos" className='bg-gradient-to-t from-[#5cd9ff] via-[#d2f2ff] to-[#ebe97c]'>
    <h3 className="bg-gradient-to-bl from-[#dd6b20] via-black to-[#dd6b20] bg-clip-text text-transparent text-4xl md:text-7xl justify-center font-semibold  text-center mb-3 pt-7">The Companies That Integrated <br/> Our Robotics Vision</h3>
    <p className="text-gray-700 text-base md:text-3xl text-center mt-4 mb-5">
    We serve startups to large enterprises with tailored automation solutions that boost efficiency, <br /> improve operations, and drive measurable success.
    </p>
           
    <section className="w-full  flex flex-col md:flex-row items-center justify-start  py-16 gap-20 bg-transparent">
      {/* Left: 3-row infinite logo slider (70%) from-[#EAF6FF] via-[#90B2D8] to-[#0077b3] */}
      <div className="w-full md:w-[full] flex flex-col gap-8 relative">
        
        <LogoSliderRow logos={row1} toRight={false} duration={120} />
        <LogoSliderRow logos={row2} toRight={false} duration={60} />
        <LogoSliderRow logos={row3} toRight={false} duration={120} />
      </div>
      
    </section>
    <ContactUsForm />
    </div>
    
  );
}
