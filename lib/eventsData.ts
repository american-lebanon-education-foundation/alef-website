export interface EventData {
    slug: string;
    titlePart1: string;
    titlePart2: string;
    tagline: string;
    subtitle?: string;
    description: string;
    date: string; // ISO format for automatic comparison (e.g., "2026-12-02T18:00:00-05:00")
    displayDate: string;
    time: string;
    venueName: string;
    venueAddress: string;
    image: string;
    secondaryImage?: string;
    admission?: string;
    sponsorship?: string;
    href: string;
    bookingUrl?: string; // Optional Zeffy or booking link placeholder
}

export const EVENTS: EventData[] = [
    {
        slug: "children-of-hezbollah",
        titlePart1: "AN EXCLUSIVE EVENING AT",
        titlePart2: "TRUMP TOWER",
        tagline: "Book Launch & Fundraiser",
        subtitle: 'Introducing "Children of Hezbollah" by Lebanese Shiite leader Ali Khalife',
        description: "Join ALEF for an exclusive evening at Trump Tower in New York City to introduce Children of Hezbollah by Lebanese Shiite leader Ali Khalife. An urgent initiative to confront extremist ideology through education, knowledge, and hope for Lebanon's next generation.",
        date: "2026-12-02T18:00:00-05:00",
        displayDate: "Wednesday, December 2, 2026",
        time: "6:00 PM EST",
        venueName: "Electrum Gallery, 19th floor, Trump Tower",
        venueAddress: "Fifth Avenue, between 56th and 57th Street, New York City",
        image: "/events/trump-tower.jpg",
        secondaryImage: "/events/children-of-hezbollah.jpg",
        admission: "$250 per person",
        sponsorship: "$2,500",
        href: "/events/children-of-hezbollah",
        bookingUrl: "https://www.zeffy.com/en-US/ticketing/an-exclusive-evening-at-trump-tower-children-of-hezbollah",
    },
    {
        slug: "gathering-for-a-new-lebanon",
        titlePart1: "GATHERING FOR A NEW",
        titlePart2: "LEBANON",
        tagline: "Inauguration Celebration",
        subtitle: "ALEF Brief and Action Driven Agenda on Lebanon & Middle East",
        description: "Join us for an evening of dialogue, unity, and vision. We will present the ALEF Brief and Action Driven Agenda on Lebanon & Middle East.",
        date: "2026-04-14T18:00:00-04:00",
        displayDate: "April 14, 2026",
        time: "6:00 PM Reception • 7:00 PM Dinner",
        venueName: "Yara Restaurant",
        venueAddress: "319 East 53rd Street, New York, NY 10022",
        image: "/events/Event_Image.jpg",
        href: "/events/gathering-for-a-new-lebanon",
    },
];

/**
 * Returns all events categorized automatically into upcoming and past
 * based on the current timestamp compared against event.date.
 */
export function getCategorizedEvents() {
    const now = new Date();
    const upcoming = EVENTS.filter((event) => new Date(event.date) >= now);
    const past = EVENTS.filter((event) => new Date(event.date) < now);

    return {
        upcoming,
        past,
        totalUpcoming: upcoming.length,
        totalPast: past.length,
    };
}

