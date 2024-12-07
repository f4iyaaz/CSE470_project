// Simulate in-memory user data storage (can replace with database in real-world app)
const userDashboards = {}; // In-memory user data

// Fetch user's dashboard (recent conversions and favorite pairs)
exports.getDashboard = (req, res) => {
  const { userId } = req.params;
  const dashboard = userDashboards[userId] || {
    recentConversions: [],
    favoritePairs: [],
  };
  res.json(dashboard);
};

// Update user dashboard (favorite pairs, layout, etc.)
exports.updateDashboard = (req, res) => {
  const { userId } = req.params;
  const { favoritePairs } = req.body;

  if (!userDashboards[userId]) {
    userDashboards[userId] = { recentConversions: [], favoritePairs: [] };
  }

  userDashboards[userId] = { ...userDashboards[userId], favoritePairs };

  res.json(userDashboards[userId]);
};
