const Tweet = require('../models/tweetModel');

exports.postTweet = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const tweet = new Tweet({ userId, text });
    await tweet.save();
    res.status(201).json({ message: 'Tweet posted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTimeline = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cursor } = req.query;

    const query = { userId };
    if (cursor) {
      query._id = { $lt: cursor };
    }

    const tweets = await Tweet.find(query).sort({ createdAt: -1 }).limit(10);
    const nextCursor = tweets.length ? tweets[tweets.length - 1]._id : null;

    res.status(200).json({ tweets, nextCursor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
