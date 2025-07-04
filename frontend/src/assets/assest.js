// Import images
import pumpImage from '../assets/pump-header.jpg';
import wireImage from '../assets/wire-header.jpg';
import panelImage from '../assets/panel-header.jpg';
import pipeImage from '../assets/pipe-header.jpg';

import V4Pump from '../assets/v4-pump.png';
import V5Pump from '../assets/v5-pump.png';
import V6Pump from '../assets/v6-pump.png';
import OpenWellPump from '../assets/openwell-pump.jpg';
import DeepWellPump from '../assets/deepwell-pump.jpg';
import SewagePump from '../assets/sewage-pump.jpg';
import HighPressurePump from '../assets/high-pressure-pump.jpg';
import V8Pump from '../assets/v8-pump.png';

// Product List
export const products_list = [
  { product_name: 'Submersible Pump', product_image:pumpImage },
  { product_name: 'Wire Cables', product_image: wireImage },
  { product_name: 'Control Panel', product_image: panelImage},
  { product_name: 'PVC Pipes', product_image: pipeImage },
];

// Pump List Data
export const pump_list = [
  {
    id: 1,
    name: "V4 Submersible Pump",
    image: V4Pump,
    price: "₹15,000",
    description: "A V4 submersible pump designed for domestic and industrial water supply, offering high efficiency and durability.",
    category: "Submersible Pump"
  },
  {
    id: 2,
    name: "V5 Submersible Pump",
    image: V5Pump,
    price: "₹18,000",
    description: "A V5 submersible pump suitable for medium-depth borewells, ensuring reliable water supply.",
    category: "Submersible Pump"
  },
  {
    id: 3,
    name: "V6 Submersible Pump",
    image: V6Pump,
    price: "₹25,000",
    description: "A V6 submersible pump for deeper borewells, providing excellent water lifting capacity and long lifespan.",
    category: "Submersible Pump"
  },
  {
    id: 8,
    name: "V8 Submersible Pump",
    image: V8Pump,
    price: "₹35,000",
    description: "A V8 submersible pump with advanced technology for high-volume water output and efficient operation.",
    category: "Submersible Pump"
  },
  {
    id: 4,
    name: "Open Well Submersible Pump",
    image: OpenWellPump,
    price: "₹18,000",
    description: "Ideal for open wells, these pumps provide consistent water supply with energy-efficient performance.",
    category: "Submersible Pump"
  },
  {
    id: 5,
    name: "Deep Well Submersible Pump",
    image: DeepWellPump,
    price: "₹22,000",
    description: "Designed for extra deep borewells, offering high efficiency and robust performance.",
    category: "Submersible Pump"
  },
  {
    id: 6,
    name: "Sewage Submersible Pump",
    image: SewagePump,
    price: "₹22,000",
    description: "A robust pump suitable for sewage and wastewater management, featuring anti-clogging technology.",
    category: "Submersible Pump"
  },
  {
    id: 7,
    name: "High-Pressure Submersible Pump",
    image: HighPressurePump,
    price: "₹30,000",
    description: "A high-pressure pump designed for industrial and agricultural applications, ensuring powerful water flow.",
    category: "Submersible Pump"
  }
];