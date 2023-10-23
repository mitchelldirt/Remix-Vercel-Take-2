import {JSDOM} from 'jsdom';

export function parseLocations(html: string) {
    const dom = new JSDOM(html)
    const document = dom.window.document
    const locations = document.querySelectorAll('.location');
    let parsedLocations: string[] = [];

    locations.forEach((location) => {
        const innerText = location.textContent;

        if (innerText) {
            parsedLocations.push(innerText);
        }
    })
    return parsedLocations;
}