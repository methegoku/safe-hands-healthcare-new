export const cities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirapalli",
    "Salem",
    "Tirunelveli",
    "Vellore",
    "Erode",
    "Thoothukudi",
    "Dindigul",
];

export const serviceCategories = [
    {
        id: 1,
        name: "Home Care",
        description: "Supportive and medical care in the comfort of home.",
        icon: "home",
    },
    {
        id: 2,
        name: "Medical Services",
        description: "Professional healthcare and treatments.",
        icon: "stethoscope",
    },
    {
        id: 3,
        name: "Child Care",
        description: "Safe and nurturing care for children.",
        icon: "baby",
    },
    {
        id: 4,
        name: "Elderly Care",
        description: "Compassionate care for senior citizens.",
        icon: "heart",
    },
];

export const services = [
    {
        id: 1,
        name: "Wound Dressing",
        categoryId: 2,
        description: "Expert care for wounds and post-surgical dressings.",
    },
    {
        id: 2,
        name: "IV Therapy",
        categoryId: 2,
        description: "At-home intravenous therapy by professionals.",
    },
    {
        id: 3,
        name: "Infant Care",
        categoryId: 3,
        description: "Specialized care for newborns and infants.",
    },
    {
        id: 4,
        name: "Babysitting",
        categoryId: 3,
        description: "Reliable short-term child care at your home.",
    },
    {
        id: 5,
        name: "Dementia Care",
        categoryId: 4,
        description: "Compassionate care for seniors with memory loss.",
    },
    {
        id: 6,
        name: "Mobility Assistance",
        categoryId: 4,
        description: "Help with moving around and physical support.",
    },
    {
        id: 7,
        name: "Post-Surgery Home Care",
        categoryId: 1,
        description: "Recovery support and monitoring after surgery.",
    },
    {
        id: 8,
        name: "Routine Health Monitoring",
        categoryId: 1,
        description: "Daily checkups and vital tracking at home.",
    },
];

export const providers = [
    {
        id: 1,
        name: "Priya Sharma",
        rating: 4.8,
        servicesOffered: [1, 7],
        city: "Chennai",
        experience: 5,
    },
    {
        id: 2,
        name: "Ravi Kumar",
        rating: 4.6,
        servicesOffered: [2, 8],
        city: "Coimbatore",
        experience: 4,
    },
    {
        id: 3,
        name: "Anjali Menon",
        rating: 4.9,
        servicesOffered: [3, 4],
        city: "Madurai",
        experience: 6,
    },
    {
        id: 4,
        name: "Sundar Raj",
        rating: 4.7,
        servicesOffered: [5, 6],
        city: "Tiruchirapalli",
        experience: 7,
    },
];

export const bookings = [
    {
        id: 1,
        userId: 1,
        providerId: 1,
        serviceId: 7,
        date: "2025-07-05",
        time: "10:00 AM",
        notes: "Post-surgery care for knee replacement.",
    },
    {
        id: 2,
        userId: 1,
        providerId: 3,
        serviceId: 3,
        date: "2025-07-10",
        time: "3:00 PM",
        notes: "Infant care for 6-month-old baby.",
    },
];

export const reviews = [
    {
        id: 1,
        providerId: 1,
        userId: 1,
        rating: 5,
        comment: "Excellent post-surgery care. Very professional.",
    },
    {
        id: 2,
        providerId: 3,
        userId: 1,
        rating: 4,
        comment: "Very caring and gentle with our baby.",
    },
];
