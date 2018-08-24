var friends = require("../data/friend.js");
//we require the data from the friend.js file and apply it here to be routed through to the server
//you might notice by this point that requiring a file like this is pretty much the same as requiring data from an npm file!
// using require and module.export is the key to routing data with express!
console.log("api routing is avalible")

//once again, we export the functions used here in a module.exports command, and we tell the server that we send this data to that this data requires the use of app, or express, to function
module.exports = function (app) {

  // here, we tell the app to get something
  // we tell it to get something when the website path is "/api/friends"
  // if that is the case, the function activates...
  app.get("/api/friends", function (req, res) {
    // ... and it tells the app to result in the import freidns variable, which, remember, is actually our friend.js file
    // then it converts that data into a json form because that helps for reasons that i still dont really get and at this point ill look like an idiot for asking
    res.json(friends);
  })

  app.post("/api/friends", function (req, res) {

    // the following code is used to determine who has the closest answers to the users answers
    // this code is not important to understanding how to route data through express so one wonders why we have to do this but that us life my droogs 

    // we need to create an object that will hold the results of the following code so that we can export it easier
    // we do this by making a variable called bestMatch, and have it blank so that we can add data into it later on
    var bestMatch = {
      name: "",
      photo: "",
      // we use this property called friendDifference to track the difference between the answers of the user and everuone else
      friendDifference: 1000
    };

    // next thing we do is create these two variables that will take the req.body coming from the user
    var userData = req.body;
    console.log(userData);
    // .. then we grab the score data from THAT variable and assign it to its own varable called userScores
    var userScores = userData.scores;
    //essentially, what we are doing here is isolating the user scores from the rest of the body data
    console.log(userScores);


    // we then create this variable called totalDifference
    // we need this in order to define exactly what sort of difference there is between the sum of the users' scores
    var totalDifference = 0;

    // here, we make a forloop that will take the friends variable (which is actually our friend.js file)
    for (let i = 0; i < friends.length; i++) {
      console.log(friends[i]);
      totalDifference = 0;

      //then we make ANOTHER forloop to take every instance of that loop, 
      // and lop over the scores within each element of the array that the main forloop is looping through
      //for every friends[i] element that the i forloop goes through, the j forloop will take that element
      // and loop through that friend[i] score array 
      for (let j = 0; j < friends[i].scores[j]; j++) {
        // this is where the actual math happens
        // here, we examine the score of the particualr j question we are examining, and we subtract the score of the user's answer with the score of the friend we are currently looping through
        // then we take that difference and we use += to sum that number into the totalDifference
        // this process happens with every single score we loop over in the j forloop...
        // ... in every instance of the the i forloop...
        // for each friend we loop over, we get a summed number...
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        if (totalDifference <= bestMatch.friendDifference) {
          //... which we then use here!
          // here, we take the new total difference anc compare it with the current "bestMatch.friendDifference" property
          // currently, its set to 1000, so any sum could trump the current friendDifference
          // BUT the first totalDifference to take the place of the 1000 has to then be compared to the other totalDifferences, because it itself is the new friendDifference!
          // think of it like smashing two m&ms between your fingers, eventually one will break the other
          // but using the remaining m&m against another m&m and using the winner of that to go against another m&m until one remains
          // essentially the lopp repeats with each friend, their scores being comapred constantly until one is left

          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
          // whoevers number is considered to be the last one in totalDifference will be placed as the new friendDifference in the bestMatch variable aboce
          // and the friend whos index where that new friendDifference came from shall have their info placed in the bestMatch variable too
        }

      }

    }

    friends.push(userData);
    // we then push the user's answer data into the friends array
    // this has to happen AFTER the calculations, otherwise the users own data will get calculated into the math step
    // and the user will be determined to be their own best friend which is a bit sad really

    res.json(bestMatch);
    // lastly, we save  the results of our bestMatch variable in JSON format
    // we save it as JSON so that we can take out bits of it like an API and apply them to our HTML



  })

}