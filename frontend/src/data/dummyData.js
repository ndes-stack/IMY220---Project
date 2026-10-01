export const dummyPosts = [
  {
    id: 1,
    title: "Truffle Tagliatelle",
    tag: "#Italian #Pasta #Dinner",
    description: "Silky hand-rolled tagliatelle coated in rich European butter and shaved black Umbrian winter truffles.",
    review: "Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. The earthy truffle aroma fills the kitchen, balanced perfectly by aged Parmigiano-Reggiano.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    author: "pasta_maestro",
    authorAvatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
    likes: 142,
    date: "Sep 2, 2026",
    comments: [
      {
        id: 101,
        title: "Absolutely delicious!",
        body: "Tried this recipe last night and the emulsion of butter with pasta water was pure magic.",
        author: "chef_mario",
        authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
        date: "Sep 2, 2026"
      },
      {
        id: 102,
        title: "Perfection on a plate",
        body: "The truffle slices brought it to a whole new Michelin level. Will definitely cook this again!",
        author: "baker_jane",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        date: "Sep 2, 2026"
      },
      {
        id: 103,
        title: "Comfort food redefined",
        body: "Simple ingredients done right. 10/10 recommendation!",
        author: "gourmet_guy",
        authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80",
        date: "Sep 1, 2026"
      }
    ]
  },
  {
    id: 2,
    title: "Classic Carbonara",
    tag: "#Authentic #Roman #ComfortFood",
    description: "Traditional Roman carbonara made strictly with crispy guanciale, pecorino romano, farm fresh egg yolks, and cracked black pepper.",
    review: "No cream, no peas! Creamy rich emulsion created solely with hot starchy pasta water and tempered egg yolks. Crisp guanciale bits deliver incredible savory crunch.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
    author: "pasta_maestro",
    authorAvatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80",
    likes: 98,
    date: "Sep 1, 2026",
    comments: [
      {
        id: 201,
        title: "The only true recipe",
        body: "So happy to see someone respecting the guanciale and pecorino tradition!",
        author: "lucia_romana",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
        date: "Sep 1, 2026"
      }
    ]
  },
  {
    id: 3,
    title: "Spicy Miso Ramen",
    tag: "#Japanese #Ramen #SoulFood",
    description: "18-hour simmered pork bone broth with rich red miso tare, charred chashu belly, springy noodles, and a soft-boiled ajitsuke tamago.",
    review: "Deep umami depth with chili garlic oil floating on top. Warming and deeply satisfying on any chilly evening.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    author: "ramen_sensei",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    likes: 215,
    date: "Aug 30, 2026",
    comments: [
      {
        id: 301,
        title: "Broth is golden",
        body: "That soft boiled egg looks like perfection. Great work on the broth!",
        author: "tokyo_bites",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        date: "Aug 31, 2026"
      }
    ]
  },
  {
    id: 4,
    title: "Woodfired Margherita",
    tag: "#Napoli #Pizza #Artisan",
    description: "San Marzano D.O.P tomatoes, fresh Fior di Latte mozzarella, fragrant basil leaves, and cold-pressed extra virgin olive oil on fermented sourdough.",
    review: "Blistered leopard-spotted crust baked in a 900-degree oven for 70 seconds. Simple, light, airy, and bursting with Mediterranean sweetness.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    author: "pizza_pete",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    likes: 180,
    date: "Aug 29, 2026",
    comments: [
      {
        id: 401,
        title: "Incredible crust",
        body: "Look at that crumb structure and blistered rim!",
        author: "dough_boy",
        authorAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
        date: "Aug 30, 2026"
      }
    ]
  }
];

export const dummyProfiles = {
  1: {
    id: 1,
    username: "pasta_maestro",
    name: "Marco Rossi",
    subtitle: "home cook, obsessed with pasta",
    bio: "Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning.",
    avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80",
    followers: 1240,
    following: 382,
    posts: [1, 2],
    friends: [
      { id: 101, username: "chef_mario", name: "Mario Battaglia", subtitle: "Executive Chef @ Osteria", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" },
      { id: 102, username: "baker_jane", name: "Jane Doe", subtitle: "Pastry Artisan & Sourdough Geek", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
      { id: 103, username: "tokyo_bites", name: "Kenji Sato", subtitle: "Street food explorer", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
    ]
  }
};
