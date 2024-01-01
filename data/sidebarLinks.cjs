const sidebarLinks = [
  { name: "Dashboard", route: "/", icon: "bi bi-grid", active: true },
  {
    name: "Admin Role",
    route: "/admin_role",
    icon: "bi bi-person-vcard-fill",
    active: false
  },
  {
    name: "Ludo Game",
    route: "/Ludo",
    icon: "bi bi-person-vcard-fill",
    active: false
  },
  {
    name: "Pool Game",
    route: "/Pool",
    icon: "bi bi-person-vcard-fill",
    active: false
  },
  {
    name: "Carrom Game",
    route: "/Carrom",
    icon: "bi bi-person-vcard-fill",
    active: false
  },
  {
    name: "Player Master",
    route: "/player",
    icon: "bi bi-people-fill",
    active: false
  },
  {
    name: "PAN CARD",
    route: "/Lobbies",
    icon: "bi bi-grid-3x3-gap",
    active: false
  },
  {
    name: "Entey fees setting",
    route: "/entryfees",
    icon: "bi bi-envelope",
    active: false
  },
  {
    name: "Profile",
    route: "/users-profile",
    icon: "bi bi-person",
    active: false
  },

  {
    name: "Withdrowls",
    icon: "bi bi-bar-chart",
    active: false,
    submenu: [
      {
        name: "Request",
        route: "/with_re",
        icon: "bi bi-circle",
        active: false
      },
      {
        name: "Approval",
        route: "/with_app",
        icon: "bi bi-circle",
        active: false
      },
      {
        name: "Reject",
        route: "/with_rej",
        icon: "bi bi-circle",
        active: false
      }
    ]
  },
  {
    name: "Recharge",
    icon: "bi bi-layout-text-window-reverse",
    active: false,
    submenu: [
      {
        name: "Recharge Request",
        route: "/rech_pe",
        icon: "bi bi-circle",
        active: false
      },
      {
        name: "Recharge Approval",
        route: "/tic_app",
        icon: "bi bi-circle",
        active: false
      },
      {
        name: "Recharge Reject",
        route: "/rech_rej",
        icon: "bi bi-circle",
        active: false
      }
    ]
  },
  {
    name: "Ticket",
    icon: "bi bi-ticket-perforated",
    active: false,
    submenu: [
      {
        name: "Ticket Request",
        route: "/tic_re",
        icon: "bi bi-circle",
        active: false
      },
      {
        name: "Ticket Approval",
        route: "/tic_app",
        icon: "bi bi-circle",
        active: false
      }
    ]
  },
  {
    name: "Setting",
    icon: "bi bi-gear",
    active: false,
    submenu: [
      { name: "Bonus", route: "/Bonus", icon: "bi bi-circle", active: "0" },
      {
        name: "Refer & Earn",
        route: "/Refer",
        icon: "bi bi-circle",
        active: false
      },
      {
        name: "Win & Lose",
        route: "/Win_lose",
        icon: "bi bi-circle",
        active: false
      },
      {
        name: "Image Slider",
        route: "/slider",
        icon: "bi bi-circle",
        active: false
      }
    ]
  },
  { name: "Logout", icon: "bi bi-question-circle", active: false }

  // Add more top-level or submenu items here
];

module.exports = sidebarLinks;
