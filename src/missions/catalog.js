// Mission catalog: 6 story missions and side activities
export const REP_LEVELS = [
  { level: 1, title: 'Kurir Pemula (Novice Courier)', repRequired: 0 },
  { level: 2, title: 'Pengemudi Malam (Night Driver)', repRequired: 500 },
  { level: 3, title: 'Spesialis Dusk Bay (Bay Specialist)', repRequired: 1500 },
  { level: 4, title: 'Legenda Senja (Senja Legend)', repRequired: 3500 }
];

export const MISSIONS = [
  {
    id: 1,
    title: 'PAKET KILAT',
    client: 'mira',
    clientName: 'Mira',
    objective: 'Drive the package across town to Pantai Senja',
    briefing: 'Raka, pick up this courier package from the old pier and deliver it to Pantai Senja before the heat catches wind.',
    timer: 180,
    rewardCash: 500,
    rewardRep: 150,
    targetCoords: { x: -500, z: -400 }
  },
  {
    id: 2,
    title: 'MOBIL PINJAMAN',
    client: 'mira',
    clientName: 'Mira',
    objective: 'Steal a Kencana GT and deliver it to Mira\'s garage',
    briefing: 'We need high-end wheels for the upcoming crew work. Swipe a pristine Kencana GT parked near the Marina and bring it back.',
    timer: 240,
    rewardCash: 800,
    rewardRep: 250,
    targetCoords: { x: -200, z: 300 }
  },
  {
    id: 3,
    title: 'TAGIHAN MIRA',
    client: 'mira',
    clientName: 'Mira',
    objective: 'Collect cash on foot in Pasar Senja and fight off two thugs',
    briefing: 'Some local street muscle in Pasar Senja are skipping their protection dues. Go down on foot, collect the cash, and teach them respect.',
    timer: 300,
    rewardCash: 1000,
    rewardRep: 400,
    targetCoords: { x: 150, z: -150 }
  },
  {
    id: 4,
    title: 'BALAPAN PELABUHAN',
    client: 'rival',
    clientName: 'Bayu',
    objective: 'Win the street race through the Pelabuhan docks vs 3 rivals',
    briefing: 'Think you are fast, ex-courier? Prove your mettle against our top street racers through the winding containers of Pelabuhan.',
    timer: 220,
    rewardCash: 1500,
    rewardRep: 600,
    targetCoords: { x: 600, z: 500 }
  },
  {
    id: 5,
    title: 'GUDANG 7',
    client: 'mira',
    clientName: 'Mira',
    objective: 'Infiltrate Warehouse 7, shootout, and steal the cargo',
    briefing: 'Syndicate cargo is stored at Warehouse 7 in the industrial harbor. Infiltrate the perimeter, eliminate guards, and secure the goods.',
    timer: 350,
    rewardCash: 2000,
    rewardRep: 900,
    targetCoords: { x: -800, z: 600 }
  },
  {
    id: 6,
    title: 'SENJA CASH',
    client: 'mira',
    clientName: 'Mira',
    objective: 'Finale getaway: escape with the cash, 4-star police + helicopter',
    briefing: 'This is it, Raka. We scored the ultimate payout. Senja PD and ELANG-2 are swarming. Shake the heat and bring the cash home to Mira!',
    timer: 400,
    rewardCash: 5000,
    rewardRep: 2000,
    targetCoords: { x: -744, z: 0 }
  }
];

export const SIDE_ACTIVITIES = {
  stuntJumps: [
    { id: 1, name: 'Marina Ramp', x: -300, z: 120, completed: false },
    { id: 2, name: 'Docks Overpass', x: 450, z: 320, completed: false },
    { id: 3, name: 'Market Alley Jump', x: 120, z: -280, completed: false },
    { id: 4, name: 'Coastal Cliff Leap', x: -650, z: -550, completed: false },
    { id: 5, name: 'Industrial Bridge Gap', x: -250, z: 700, completed: false }
  ],
  shells: [
    { id: 1, x: -740, z: 20, collected: false },
    { id: 2, x: -600, z: 150, collected: false },
    { id: 3, x: -500, z: -300, collected: false },
    { id: 4, x: -200, z: -450, collected: false },
    { id: 5, x: 50, z: -200, collected: false },
    { id: 6, x: 250, z: -100, collected: false },
    { id: 7, x: 400, z: 100, collected: false },
    { id: 8, x: 550, z: 350, collected: false },
    { id: 9, x: 300, z: 600, collected: false },
    { id: 10, x: -100, z: 500, collected: false },
    { id: 11, x: -400, z: 400, collected: false },
    { id: 12, x: -700, z: -200, collected: false }
  ],
  taxiFaresActive: false
};
