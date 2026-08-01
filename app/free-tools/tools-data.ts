export interface ToolEntry {
  slug: string;
  name: string;
  industry: string;
  description: string;
  keywords: string[];
  isCore: boolean;
  category: 'calculator' | 'generator' | 'takeoff';
  /** Whether this tool is hosted on .co.nz yet */
  ported: boolean;
}

export const TOOLS: ToolEntry[] = [
  { slug: 'free-roofing-takeoff-builder', name: 'Roof Takeoff Builder', industry: 'Roofing', description: 'Build a complete roof takeoff with pitch calculations for all components.', keywords: ['takeoff', 'roof', 'area', 'pitch', 'hip', 'valley', 'ridge', 'barge', 'spouting', 'material'], isCore: true, category: 'takeoff', ported: false },
  { slug: 'free-roofing-calculator', name: 'Roofing Calculator', industry: 'Roofing', description: 'Roof pitch, rafter and hip/valley lengths, surface area, and roofing material quantities.', keywords: ['pitch', 'rafter', 'hip', 'valley', 'area', 'battens', 'angle'], isCore: true, category: 'calculator', ported: false },
  { slug: 'free-construction-calculator', name: 'Construction Calculator', industry: 'Construction', description: 'Floor and wall areas, timber and stud lengths, material quantities, and cutting angles.', keywords: ['area', 'timber', 'stud', 'materials', 'angle', 'wall', 'floor'], isCore: true, category: 'calculator', ported: false },
  { slug: 'free-concrete-calculator', name: 'Concrete Calculator', industry: 'Concrete', description: 'Slab and footing volumes with depth presets, formwork areas, falls, and ready-mix pricing.', keywords: ['slab', 'footing', 'volume', 'formwork', 'falls', 'gradient', 'ready-mix'], isCore: true, category: 'calculator', ported: false },
  { slug: 'free-landscaping-calculator', name: 'Landscaping Calculator', industry: 'Landscaping', description: 'Garden and lawn areas, turf and topsoil quantities, slopes, gradients, and falls.', keywords: ['garden', 'lawn', 'turf', 'topsoil', 'slope', 'gradient', 'area'], isCore: true, category: 'calculator', ported: false },
  { slug: 'free-birds-mouth-calculator', name: "Bird's Mouth Calculator", industry: 'Roofing', description: "Bird's mouth seat cut and plumb cut angles, heel height, and notch depth with 1/3-depth pass/fail check.", keywords: ['birdsmouth', 'seat cut', 'plumb cut', 'rafter', 'stringer', 'stair', 'notch'], isCore: true, category: 'calculator', ported: false },
  { slug: 'free-quote-generator', name: 'Quote Generator', industry: 'Trade', description: 'Create professional quotes in minutes. No signup required, download as PDF.', keywords: ['quote', 'estimate', 'pdf', 'free'], isCore: true, category: 'generator', ported: false },
  { slug: 'free-invoice-generator', name: 'Invoice Generator', industry: 'Trade', description: 'Create professional invoices with GST calculations. Download as PDF.', keywords: ['invoice', 'billing', 'pdf', 'free', 'gst'], isCore: true, category: 'generator', ported: false },
  { slug: 'free-purchase-order-generator', name: 'Purchase Order Generator', industry: 'Trade', description: 'Generate professional purchase orders for suppliers. Download as PDF.', keywords: ['purchase order', 'po', 'supplier', 'pdf', 'free'], isCore: true, category: 'generator', ported: false },
  { slug: 'free-roof-pitch-calculator', name: 'Roof Pitch Calculator', industry: 'Roofing', description: 'Calculate roof pitch from rise and run.', keywords: ['pitch', 'rise', 'run', 'angle', 'slope'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-pitch-converter', name: 'Roof Pitch Converter', industry: 'Roofing', description: 'Convert between pitch ratio, degrees, and percentage.', keywords: ['pitch', 'convert', 'degrees', 'ratio', 'percentage'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-area-calculator', name: 'Roof Area Calculator', industry: 'Roofing', description: 'Calculate roof surface area from plan dimensions and pitch.', keywords: ['area', 'surface', 'plan', 'pitch', 'square'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-rafter-length-calculator', name: 'Rafter Length Calculator', industry: 'Roofing', description: 'Calculate rafter length from span and pitch.', keywords: ['rafter', 'length', 'span', 'pitch'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-rafter-length-converter', name: 'Rafter Length Converter', industry: 'Roofing', description: 'Convert rafter measurements between metric and imperial.', keywords: ['rafter', 'convert', 'metric', 'imperial'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-hip-valley-calculator', name: 'Hip & Valley Calculator', industry: 'Roofing', description: 'Calculate hip and valley rafter lengths.', keywords: ['hip', 'valley', 'rafter', 'length'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-hip-valley-converter', name: 'Hip & Valley Converter', industry: 'Roofing', description: 'Convert hip and valley measurements between units.', keywords: ['hip', 'valley', 'convert', 'metric', 'imperial'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-smart-component-creator', name: 'Smart Component Creator', industry: 'Roofing', description: 'Build smart roofing components with materials, waste, and costs.', keywords: ['smart component', 'component', 'material', 'quantity', 'cost', 'tiles'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-metal-roofing-calculator', name: 'Metal Roofing Calculator', industry: 'Roofing', description: 'Calculate long-run roofing sheets and fixings.', keywords: ['metal', 'sheet', 'fixings', 'long-run', 'corrugated'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-shingle-calculator', name: 'Shingle Calculator', industry: 'Roofing', description: 'Calculate shingle quantities for your roof.', keywords: ['shingle', 'quantity', 'bundle'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-tile-calculator', name: 'Roof Tile Calculator', industry: 'Roofing', description: 'Calculate roof tile quantities and waste.', keywords: ['tile', 'quantity', 'waste'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-flat-roof-calculator', name: 'Flat Roof Calculator', industry: 'Roofing', description: 'Calculate flat roof area and materials.', keywords: ['flat', 'area', 'material', 'membrane'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-gable-roof-calculator', name: 'Gable Roof Calculator', industry: 'Roofing', description: 'Calculate gable roof area, rafters and materials.', keywords: ['gable', 'area', 'rafter', 'material'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-hip-roof-calculator', name: 'Hip Roof Calculator', industry: 'Roofing', description: 'Calculate hip roof area, rafters and materials.', keywords: ['hip', 'area', 'rafter', 'material'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-skillion-roof-calculator', name: 'Skillion Roof Calculator', industry: 'Roofing', description: 'Calculate skillion roof area and materials.', keywords: ['skillion', 'shed', 'area', 'material'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-squares-calculator', name: 'Roof Squares Calculator', industry: 'Roofing', description: 'Calculate roof area in roofing squares.', keywords: ['squares', 'area', 'measurement'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-square-metre-calculator', name: 'Roof Square Metre Calculator', industry: 'Roofing', description: 'Calculate roof area in square metres.', keywords: ['square metre', 'm2', 'area'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-square-footage-calculator', name: 'Roof Square Footage Calculator', industry: 'Roofing', description: 'Calculate roof area in square feet.', keywords: ['square foot', 'ft2', 'area'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-sheathing-calculator', name: 'Roof Sheathing Calculator', industry: 'Roofing', description: 'Calculate roof sheathing quantities.', keywords: ['sheathing', 'decking', 'plywood', 'osb'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roofing-waste-calculator', name: 'Roofing Waste Calculator', industry: 'Roofing', description: 'Calculate roofing waste allowance.', keywords: ['waste', 'allowance', 'offcut'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-sheet-calculator', name: 'Roof Sheet Calculator', industry: 'Roofing', description: 'Calculate long-run roof sheet quantities.', keywords: ['sheet', 'long-run', 'corrugated', 'quantity'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-guttering-calculator', name: 'Spouting Calculator', industry: 'Roofing', description: 'Calculate spouting lengths and downpipe quantities.', keywords: ['spouting', 'gutter', 'downpipe', 'drainage'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-flashing-calculator', name: 'Roof Flashing Calculator', industry: 'Roofing', description: 'Calculate flashing lengths for roofs.', keywords: ['flashing', 'apron', 'step', 'valley'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roof-replacement-cost-calculator', name: 'Roof Replacement Cost Calculator', industry: 'Roofing', description: 'Estimate roof replacement costs in NZD.', keywords: ['cost', 'replacement', 'price', 'estimate', 'nzd'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roofing-takeoff-calculator', name: 'Roofing Takeoff Calculator', industry: 'Roofing', description: 'Full roofing takeoff with materials and labour.', keywords: ['takeoff', 'material', 'labour', 'estimate'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-roofing-quote-calculator', name: 'Roofing Quote Calculator', industry: 'Roofing', description: 'Generate a roofing quote from calculations.', keywords: ['quote', 'price', 'estimate'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-concrete-slab-calculator', name: 'Concrete Slab Calculator', industry: 'Concrete', description: 'Calculate concrete slab volume and area.', keywords: ['slab', 'volume', 'concrete', 'area'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-concrete-bag-calculator', name: 'Concrete Bag Calculator', industry: 'Concrete', description: 'Calculate number of concrete bags needed.', keywords: ['bag', 'premix', 'quantity'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-footing-calculator', name: 'Footing Calculator', industry: 'Concrete', description: 'Calculate concrete footing volumes.', keywords: ['footing', 'foundation', 'volume'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-rebar-calculator', name: 'Rebar Calculator', industry: 'Concrete', description: 'Calculate rebar quantities for slabs and footings.', keywords: ['rebar', 'reinforcement', 'steel', 'grid'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-trench-calculator', name: 'Trench Calculator', industry: 'Concrete', description: 'Calculate trench volume for footings and services.', keywords: ['trench', 'excavation', 'volume', 'footing'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-wall-area-calculator', name: 'Wall Area Calculator', industry: 'Construction', description: 'Calculate wall surface area for materials.', keywords: ['wall', 'area', 'surface', 'paint'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-paint-calculator', name: 'Paint Calculator', industry: 'Construction', description: 'Calculate paint quantities for walls and ceilings.', keywords: ['paint', 'coverage', 'coats', 'litres'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-tile-calculator', name: 'Tile Calculator', industry: 'Construction', description: 'Calculate tile quantities for floors and walls.', keywords: ['tile', 'quantity', 'floor', 'wall'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-flooring-calculator', name: 'Flooring Calculator', industry: 'Construction', description: 'Calculate flooring material quantities.', keywords: ['flooring', 'laminate', 'wood', 'vinyl', 'quantity'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-slope-calculator', name: 'Slope Calculator', industry: 'Construction', description: 'Calculate slope, gradient and fall percentage.', keywords: ['slope', 'gradient', 'fall', 'percentage'], isCore: false, category: 'calculator', ported: false },
  { slug: 'free-pipe-slope-calculator', name: 'Pipe Slope Calculator', industry: 'Construction', description: 'Calculate pipe slope and fall for drainage.', keywords: ['pipe', 'slope', 'drainage', 'fall'], isCore: false, category: 'calculator', ported: false },
];

export const CALCULATORS = TOOLS.filter(t => t.category === 'calculator');
export const GENERATORS = TOOLS.filter(t => t.category === 'generator');
export const TAKEOFF_TOOLS = TOOLS.filter(t => t.category === 'takeoff');
export const CALCULATOR_COUNT = CALCULATORS.length;

/** NZ-specific tool descriptions for the hub page */
export const NZ_TOOL_DESCRIPTIONS: Record<string, string> = {
  'free-roofing-takeoff-builder': 'Build a complete roof takeoff with pitch calculations for all components. Designed for NZ long-run, corrugated, and tile roofs.',
  'free-roofing-calculator': 'Roof pitch, rafter and hip/valley lengths, surface area, and roofing material quantities. NZ pitch ratios and metric measurements.',
  'free-construction-calculator': 'Floor and wall areas, timber and stud lengths, material quantities, and cutting angles. NZS 3604 timber sizes.',
  'free-concrete-calculator': 'Slab and footing volumes with depth presets, formwork areas, falls, and ready-mix pricing in NZD per m3.',
  'free-landscaping-calculator': 'Garden and lawn areas, turf and topsoil quantities, slopes, gradients, and falls. NZ turf varieties and topsoil pricing.',
  'free-birds-mouth-calculator': "Bird's mouth seat cut and plumb cut angles with 1/3-depth pass/fail check. NZS 3604 rafter sizes.",
  'free-quote-generator': 'Create professional quotes in minutes with GST 15% defaults. No signup required, download as PDF.',
  'free-invoice-generator': 'Create professional invoices with GST calculations and NZ bank account format. Download as PDF.',
  'free-purchase-order-generator': 'Generate professional purchase orders for NZ suppliers. Download as PDF.',
  'free-guttering-calculator': 'Calculate spouting lengths and downpipe quantities for NZ roofs.',
  'free-metal-roofing-calculator': 'Calculate long-run roofing sheets and fixings for NZ profiles.',
  'free-roof-sheet-calculator': 'Calculate long-run roof sheet quantities for NZ roofing profiles.',
};
