# News-Aggregator

This MongoDB and Mongoose application pulls the most recent articles from Financial Times, and displays them in an organized manner. 
On top of providing a link to the associated articles, users can engage in a discussion of the article through their comments. 
Comments can be viewed, new comments can be made, and comments can be deleted. 

The Article.js Schema is populated with any comments that are made on that article. The Comments model is linked to the Article model by the ObjectId

Link to Deployed Heroku Site: 

https://news-aggregator-.herokuapp.com/