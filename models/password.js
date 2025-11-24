import bcryptjs from "bcryptjs";

const pepper =
  process.env.NODE_ENV === "production"
    ? process.env.PEPPER_SECRET
    : "peppersecret";

async function hash(password) {
  const rounds = getNumbersOfRounds();
  const passwordWithPepper = password + pepper;
  return await bcryptjs.hash(passwordWithPepper, rounds);
}

function getNumbersOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(providedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
