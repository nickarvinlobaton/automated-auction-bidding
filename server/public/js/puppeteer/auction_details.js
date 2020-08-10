const puppeteer = require("puppeteer");
const arguments = process.argv;
const domainID = arguments[2];

(async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    `https://ph.auctions.godaddy.com/trpItemListing.aspx?miid=${domainID}`,
    { waitUntil: "networkidle2" }
  );

  const data = await page.evaluate(() => {

    let minimumOffer = document.querySelector('td#tdlDomaindDetailsBidOfferTextBox > input').value;
    let details = document.querySelectorAll('div#auction-listing-details > div');

    return {
      minimumOffer,
      bids: details[0].innerText,
      status: details[1].innerText,
      auctionEnds: details[3].innerText,
    }

  });

  console.log(data);

  await browser.close();
})();