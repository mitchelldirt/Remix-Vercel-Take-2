import {JSDOM} from 'jsdom';

export function parseLocations(html: string) {
    const dom = new JSDOM(html)
    const document = dom.window.document
    const locations = document.querySelectorAll('.location');
    let parsedLocations: Location[] = [];

    locations.forEach((location) => {

        // Any of these could be null..... just gonna ignore it for now
        const name = location.querySelector('h4')?.textContent?.split(' ')[0];
        const lat = location.getAttribute('data-lat');
        const lng = location.getAttribute('data-lng');
        const address = location.querySelector('p')?.textContent;
        const facebookAddress = location.querySelector('[data-yext-field="facebookPageUrl"]')?.getAttribute('href');

        parsedLocations.push({
            name,
            lat,
            lng,
            address,
            facebookAddress
        })
    })
    return parsedLocations;
}

export type Location = {
    name: string | undefined,
    lat: string | null,
    lng: string | null,
    address: string | null | undefined,
    facebookAddress: string | null | undefined
}