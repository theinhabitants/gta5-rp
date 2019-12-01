const DRIVER_SEAT = -1;

mp.events.add("engineCar", (player) => {
    let vehicle = player.vehicle;

    player.call("vehHandler", [vehicle, player.vehicle.engine]);
});


// mp.events.add("engineCar", (player) => {
//     const vehicle = player.vehicle;
//     checkEngine(player, vehicle)
// });
//
mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {
    if (seat === DRIVER_SEAT) {
        player.call("showSpeedometer", [vehicle, vehicle.engine]);
    }
    // if (vehicle.engine) {
    //     player.call("vehHandler", ["stopEngine"]);
    // } else {
    //     player.call("vehHandler", ["startEngine"]);
    // }
});
//
// function checkEngine(player, vehicle) {
//     if (vehicle.engine) {
//         vehicle.engine = false;
//         player.call("vehHandler", ["stopEngine"]);
//     } else {
//         vehicle.engine = true;
//         player.call("vehHandler", ["startEngine"]);
//     }
// }