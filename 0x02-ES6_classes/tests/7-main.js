import Airport from "./7-airport.js";

const airportSF = new Airport('San Francisco Airport', 'SFO');
console.log(airportSF); // Logs Airport [SFO] { _name: 'San Francisco Airport', _code: 'SFO' }
console.log(airportSF.toString()); // Logs [SFO]
console.log(airportSF.name); // Logs San Francisco Airport
console.log(airportSF.code);
