export const LAHORE_LOCATIONS = {
  "lahore_city": { name: "Lahore City", x: 72, y: 38 },
  "ferozewala": { name: "Shahdara / Ferozewala", x: 64, y: 32 },
  "muridke": { name: "Muridke", x: 62, y: 22 },
  "kamoke": { name: "Kamoke", x: 58, y: 14 },
  "sheikhupura": { name: "Sheikhupura", x: 48, y: 30 },
  "safdarabad": { name: "Safdarabad", x: 30, y: 22 },
  "sangla_hill": { name: "Sangla Hill", x: 18, y: 28 },
  "shahkot": { name: "Shahkot", x: 22, y: 38 },
  "nankana_sahib": { name: "Nankana Sahib", x: 34, y: 46 },
  "warburton": { name: "Warburton", x: 42, y: 40 },
  "sharakpur": { name: "Sharakpur", x: 54, y: 42 },
  "phool_nagar": { name: "Phool Nagar", x: 46, y: 60 },
  "chunian": { name: "Chunian", x: 44, y: 70 },
  "pattoki": { name: "Pattoki", x: 36, y: 68 },
  "kot_radha_kishan": { name: "Kot Radha Kishan", x: 54, y: 62 },
  "kasur": { name: "Kasur", x: 70, y: 64 },
  "kanganpur": { name: "Kanganpur", x: 52, y: 80 },
  "raiwind": { name: "Raiwind", x: 60, y: 52 }
};

export function calculateMetrics(startKey, endKey, petrolPrice = 280) {
  if (!startKey || !endKey || startKey === endKey) {
    return {
      distanceKm: 0,
      car: { cost: 0, litres: 0, timeMin: 0 },
      bike: { cost: 0, litres: 0, timeMin: 0 },
      walk: { steps: 0, calories: 0, timeMin: 0 }
    };
  }

  const p1 = LAHORE_LOCATIONS[startKey];
  const p2 = LAHORE_LOCATIONS[endKey];

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const rawDist = Math.sqrt(dx * dx + dy * dy);
  const distanceKm = Number((rawDist * 1.95).toFixed(1));

  // Average Fuel Mileage (Car: 12 KM/L, Bike: 42 KM/L)
  const carLitres = Number((distanceKm / 12).toFixed(2));
  const bikeLitres = Number((distanceKm / 42).toFixed(2));

  return {
    distanceKm,
    car: {
      cost: Math.round(carLitres * petrolPrice),
      litres: carLitres,
      timeMin: Math.round(distanceKm * 1.5 + 8)
    },
    bike: {
      cost: Math.round(bikeLitres * petrolPrice),
      litres: bikeLitres,
      timeMin: Math.round(distanceKm * 1.2 + 5)
    },
    walk: {
      steps: Math.round(distanceKm * 1312),
      calories: Math.round(distanceKm * 65),
      timeMin: Math.round(distanceKm * 12)
    }
  };
}