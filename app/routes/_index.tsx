import type {LoaderFunctionArgs} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react'
import {parseLocations} from "~/domParser.server";

// Add in a shadcn list component. The data you need will be on https://tommys-express.com/locations
// You'll need to find a way to store all the locations which can be found using
// document.querySelectorAll('.location')

export async function loader({request}: LoaderFunctionArgs) {
    const locationsHTML = await fetch('https://tommys-express.com/locations');

    return parseLocations(await locationsHTML.text());
}

export default function Index() {
    const data = useLoaderData<typeof loader>();

    console.log(data);

    return <h1 className="text-3xl font-bold ">Hello world!</h1>;
}
