const StarNotary = artifacts.require("StarNotary");

contract('StarNotary', (accounts) => {
    it('can Create a Star', async() => {
        const tokenId = 1;
        const instance = await StarNotary.deployed();
        const user = accounts[0];
        await instance.createStar('Awesome Star!', tokenId, {from: user})
        assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
    });
    
    it('lets user put up their star for sale', async() => {
        const instance = await StarNotary.deployed();
        const user = accounts[1];
        const starId = 2;
        const starPrice = web3.utils.toWei(".01", "ether");
        await instance.createStar('awesome star', starId, {from: user});
        await instance.putStarUpForSale(starId, starPrice, {from: user});
        assert.equal(await instance.starsForSale.call(starId), starPrice);
    });
    
    it('lets userOne get the funds after the sale', async() => {
        const instance = await StarNotary.deployed();
        const userOne = accounts[1];
        const userTwo = accounts[2];
        let starId = 3;
        let starPrice = web3.utils.toWei(".01", "ether");
        let balance = web3.utils.toWei(".05", "ether");
        await instance.createStar('awesome star', starId, {from: userOne});
        await instance.putStarUpForSale(starId, starPrice, {from: userOne});
        
        // Needs approve from star owner otherwise transfer fails
        await instance.approve(userTwo, starId, { from: userOne });

        const balanceOfUserOneBeforeTransaction = await web3.eth.getBalance(userOne);
        await instance.buyStar(starId, {from: userTwo, value: balance});
        const balanceOfUserOneAfterTransaction = await web3.eth.getBalance(userOne);
        const value1 = Number(balanceOfUserOneBeforeTransaction) + Number(starPrice);
        const value2 = Number(balanceOfUserOneAfterTransaction);
        assert.equal(value1, value2);
    });
    
    it('lets userTwo buy a star, if it is put up for sale', async() => {
        const instance = await StarNotary.deployed();
        const userOne = accounts[1];
        const userTwo = accounts[2];
        const starId = 4;
        const starPrice = web3.utils.toWei(".01", "ether");
        const balance = web3.utils.toWei(".05", "ether");
        await instance.createStar('awesome star', starId, {from: userOne});
        await instance.putStarUpForSale(starId, starPrice, {from: userOne});

        // Needs approve from star owner otherwise transfer fails
        await instance.approve(userTwo, starId, { from: userOne });

        await instance.buyStar(starId, {from: userTwo, value: balance});
        assert.equal(await instance.ownerOf.call(starId), userTwo);
    });
    
    it('lets userTwo buy a star and decreases its balance in ether', async() => {
        const instance = await StarNotary.deployed();
        const userOne = accounts[1];
        const userTwo = accounts[2];
        const starId = 5;
        const starPrice = web3.utils.toWei(".01", "ether");
        const balance = web3.utils.toWei(".05", "ether");
        await instance.createStar('awesome star', starId, {from: userOne});
        await instance.putStarUpForSale(starId, starPrice, {from: userOne});

        // Needs approve from star owner otherwise transfer fails
        await instance.approve(userTwo, starId, { from: userOne });

        const balanceOfUserTwoBeforeTransaction = await web3.eth.getBalance(userTwo);
        const result = await instance.buyStar(starId, {from: userTwo, value: balance });
        const balanceAfterUserTwoBuysStar = await web3.eth.getBalance(userTwo);
        const diff = Number(balanceOfUserTwoBeforeTransaction) - Number(balanceAfterUserTwoBuysStar)

        assert.equal(Number(balanceOfUserTwoBeforeTransaction) > Number(balanceAfterUserTwoBuysStar), true);
        // starPrice + gas spent would equal to diff
        assert.equal(diff > Number(starPrice), true)
    });
    
    // Implement Task 2 Add supporting unit tests
    
    it('can add the star name and star symbol properly', async() => {
        // 1. create a Star with different tokenId
        const instance = await StarNotary.deployed();
        const user = accounts[1];
        const starId = 6;
        await instance.createStar('awesome star', starId, {from: user});
        //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
        assert.equal(await instance.name.call(), 'Star Notary');
        assert.equal(await instance.symbol.call(), 'STN');
    });
    
    it('lets 2 users exchange stars', async() => {
        // 1. create 2 Stars with different tokenId
        const instance = await StarNotary.deployed();
        const userOne = accounts[1];
        const userTwo = accounts[2];
        const starOneId = 7;
        const starTwoId = 8;
        await instance.createStar('star trek', starOneId, {from: userOne});
        await instance.createStar('star wars', starTwoId, {from: userTwo});
        // 2. Call the exchangeStars functions implemented in the Smart Contract

        // Needs approve from star owner otherwise transfer fails
        await instance.approve(userTwo, starOneId, { from: userOne });
        await instance.approve(userOne, starTwoId, { from: userTwo });

        await instance.exchangeStars(starOneId, starTwoId, { from: userTwo });
        // 3. Verify that the owners changed
        assert.equal(await instance.ownerOf(starOneId), userTwo);
        assert.equal(await instance.ownerOf(starTwoId), userOne);
    });
    
    it('lets a user transfer a star', async() => {
        // 1. create a Star with different tokenId
        const instance = await StarNotary.deployed();
        const userOne = accounts[1];
        const userTwo = accounts[2];
        const starId = 9;
        await instance.createStar('star trek', starId, {from: userOne});
        // 2. use the transferStar function implemented in the Smart Contract
        await instance.transferStar(userTwo, starId, { from: userOne });
        // 3. Verify the star owner changed.
        assert.equal(await instance.ownerOf(starId), userTwo);
    });
    
    it('lookUptokenIdToStarInfo test', async() => {
        // 1. create a Star with different tokenId
        const starName = 'My cool star'
        const instance = await StarNotary.deployed();
        const user = accounts[1];
        const starId = 10;
        await instance.createStar(starName, starId, {from: user});
        // 2. Call your method lookUptokenIdToStarInfo
        const name = await instance.lookUptokenIdToStarInfo(starId);
        // 3. Verify if you Star name is the same
        assert.equal(name, starName);
    });
});