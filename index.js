const BookingsManager = require("./bookings");
const SendEmail = require("./sendEmail");
const backendDB = require("./backendDB");

const bookingsManager = new BookingsManager(3);
const sendemail = new SendEmail();
const backenddb = new backendDB();

bookingsManager.on("buy", (email, price, timestamp) => {
  sendemail.send(email);
  backenddb.save(email, price, timestamp);
});

// bookingsManager.on("error", (error) => {
//   console.log(`Error: ${error}`);
// });

// bookingsManager.buy("test@email.com", 10);
// bookingsManager.buy("test@email.com", 10);
// bookingsManager.buy("test@email.com", 10);
// bookingsManager.buy("test@email.com", 10);

console.log(`TOTAL: ${bookingsManager.listenerCount("buy")}`);
console.log(`ERROR Listener: ${bookingsManager.listenerCount("error")}`);

const onBuy = () => {
  console.log("I will be removed soon");
};

bookingsManager.on("buy", onBuy);

console.log(`TOTAL: ${bookingsManager.listenerCount("buy")}`);

bookingsManager.buy("test@email", 20);
bookingsManager.off("buy", onBuy); //Turning off the listener

console.log(`TOTAL: ${bookingsManager.listenerCount("buy")}`);
bookingsManager.buy("test@email", 20); //Checking

bookingsManager.removeAllListeners("buy"); //Turning off all listeners
console.log(`TOTAL: ${bookingsManager.listenerCount("buy")}`);
bookingsManager.buy("test@email", 20);
