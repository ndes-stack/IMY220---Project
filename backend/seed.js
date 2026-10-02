// Seeds the Forkful database with minimum required demo data:
// 2 users, 2 posts, 1 album, and 1 accepted friendship between two users.
// Safe to run multiple times: it only inserts when collections are empty.
//u25069366
const bcrypt = require('bcryptjs');

// Seeds the given db (a connected MongoDB Db instance) if it has no users yet.
// Exported so it can be called both by the CLI entry point below and by test harnesses.
async function seedDatabase(db) {
  const users = db.collection('users');
  const posts = db.collection('posts');
  const albums = db.collection('albums');
  const friendships = db.collection('friendships');

  const userCount = await users.countDocuments();
  if (userCount > 0) {
    console.log(`Users collection already has ${userCount} document(s). Skipping seed.`);
    return { skipped: true };
  }

  const passwordHash = await bcrypt.hash('password123', 10);

  const marco = {
    username: 'pasta_maestro',
    email: 'marco@forkful.dev',
    passwordHash,
    name: 'Marco Rossi',
    subtitle: 'home cook, obsessed with pasta',
    bio: 'Third-generation pasta maker sharing family recipes from Bologna. Always experimenting with fresh egg dough and seasonal sauces.',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    followers: 1240,
    following: 382,
    createdAt: new Date().toISOString()
  };

  const kenji = {
    username: 'ramen_sensei',
    email: 'kenji@forkful.dev',
    passwordHash,
    name: 'Kenji Sato',
    subtitle: 'ramen obsessive & broth nerd',
    bio: 'Street food explorer turned home ramen chef. 18-hour broths are my love language.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    followers: 860,
    following: 210,
    createdAt: new Date().toISOString()
  };

  const insertedUsers = await users.insertMany([marco, kenji]);
  const marcoId = insertedUsers.insertedIds[0].toString();
  const kenjiId = insertedUsers.insertedIds[1].toString();

  const post1 = {
    title: 'Truffle Tagliatelle',
    tag: '#Italian #Pasta #Dinner',
    description: 'Silky hand-rolled tagliatelle coated in rich European butter and shaved black Umbrian winter truffles.',
    review: 'The earthy truffle aroma fills the kitchen, balanced perfectly by aged Parmigiano-Reggiano.',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    authorId: marcoId,
    author: marco.username,
    authorAvatar: marco.avatar,
    likes: 0,
    likedBy: [],
    comments: [],
    createdAt: new Date().toISOString(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  const post2 = {
    title: 'Spicy Miso Ramen',
    tag: '#Japanese #Ramen #SoulFood',
    description: '18-hour simmered pork bone broth with rich red miso tare, charred chashu belly, springy noodles, and a soft-boiled ajitsuke tamago.',
    review: 'Deep umami depth with chili garlic oil floating on top. Warming and deeply satisfying on any chilly evening.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    authorId: kenjiId,
    author: kenji.username,
    authorAvatar: kenji.avatar,
    likes: 0,
    likedBy: [],
    comments: [],
    createdAt: new Date().toISOString(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  const insertedPosts = await posts.insertMany([post1, post2]);
  const post1Id = insertedPosts.insertedIds[0].toString();

  await albums.insertOne({
    name: "Marco's Pasta Classics",
    description: 'A running collection of my favourite pasta dishes, from quick weeknight bowls to weekend showpieces.',
    tag: '#Pasta',
    ownerId: marcoId,
    ownerUsername: marco.username,
    postIds: [post1Id],
    createdAt: new Date().toISOString()
  });

  await friendships.insertOne({
    userA: marcoId,
    userB: kenjiId,
    status: 'accepted',
    requestedBy: marcoId,
    createdAt: new Date().toISOString(),
    acceptedAt: new Date().toISOString()
  });

  console.log('Seed complete:');
  console.log(`  Users: pasta_maestro (${marcoId}), ramen_sensei (${kenjiId})`);
  console.log(`  Posts: ${post1.title}, ${post2.title}`);
  console.log(`  Album: Marco's Pasta Classics`);
  console.log(`  Friendship: pasta_maestro <-> ramen_sensei (accepted)`);
  console.log('  Demo login password for both seeded users: password123');
  return { skipped: false, marcoId, kenjiId };
}

// CLI entry point: `node seed.js`
if (require.main === module) {
  require('dotenv').config();
  const { connectDB } = require('./db');
  connectDB()
    .then((db) => seedDatabase(db))
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
