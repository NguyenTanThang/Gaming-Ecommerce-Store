const mongoose = require("mongoose");
const Product = require("../models/product");
const config = require("../config/config");

mongoose.connect(config.MONGODB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log("we are connected")})
    .catch(err => console.log(err));

const products = [
    new Product({
        productName: "Megaman X7",
        productPrice: 3.99,
        productImgURL: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Mmx7box.jpg/220px-Mmx7box.jpg",
        productDescription: "Mega Man X7, known as Rockman X7 (ロックマンX7) in Japan, is a video game developed by Capcom for the PlayStation 2 console. It is the seventh main game in the Mega Man X series and the first in the series to appear on the sixth generation of gaming consoles. Mega Man X7 was first released in Japan on July 17, 2003, with North American and European releases following in October 2003 and March 2004 respectively. It was also released for Microsoft Windows exclusively in South Korea until the re-release as part of Mega Man X Legacy Collection 2 (Rockman X Anniversary Collection 2 in Japan) in July 24 2018 for the worldwide release and July 26, 2018 for Japan,[4][5] whose Windows version was released internationally via Steam along with PlayStation 4, Xbox One and Nintendo Switch. It is the first Mega Man X in the series to feature bilingual audio. The next game in the series, Mega Man X8, also features bilingual audio. It is the first and only Mega Man X game to be a third-person shooter (in fact the third Mega Man game to use third-person view due to the Mega Man Legends franchise)."
    }),
    new Product({
        productName: "Assassin's Creed 2",
        productPrice: 4.99,
        productImgURL: "https://images.g2a.com/newlayout/323x433/1x1x0/d6694af00283/591200b95bafe3fb3319a23b",
        productDescription: "Assassin's Creed II is a 2009 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft.[1] It is the second major installment in the Assassin's Creed series, a sequel to 2007's Assassin's Creed. The game was first released on the PlayStation 3 and Xbox 360 in November 2009, and was later made available on Microsoft Windows in March 2010 and OS X in October 2010. Several minor game related features could be redeemed on Uplay and three downloadable expansion packs were released on Xbox Live."
    }),
    new Product({
        productName: "Assassin's Creed 3",
        productPrice: 6.99,
        productImgURL: "https://media.gamestop.com/i/gamestop/10099633/Assassins-Creed-IIIg",
        productDescription: "Assassin's Creed III is a 2012 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft for PlayStation 3, Xbox 360, Wii U, and Microsoft Windows. It is the fifth major installment in the Assassin's Creed series, and a direct sequel to 2011's Assassin's Creed: Revelations. The game was released worldwide for PlayStation 3 and Xbox 360, beginning in North America on October 30, 2012, with a Wii U and Microsoft Windows release in November 2012."
    }),
    new Product({
        productName: "Assassin's Creed: Conspiracies",
        productPrice: 39.99,
        productImgURL: "https://vignette.wikia.nocookie.net/assassinscreed/images/5/56/Assassin%27s_Creed_Conspirations_Cover.jpg/revision/latest/scale-to-width-down/658?cb=20191030150420",
        productDescription: "Assassin's Creed: Conspiracies (French: Assassin's Creed: Conspirations), also known as Assassin's Creed - Cycle 2, is a two-part story published in French by Les Deux Royaumes. Following the end of the first cycle by Corbeyran and Defali, this new story is written by Guillaume Dorison and illustrated by Jean-Baptiste Hostache. The first of the two volumes saw a release in October 2016."
    })
]

let counter = 0;
products.forEach(product => {
    product.save()
    .then((createdProduct) => {
        counter++;
        console.log(counter);
        if (counter == products.length){
            mongoose.disconnect();
        }
    }).catch(err => console.log(err));
});

module.exports = () => {
    console.log("Commit");
}

